export const summary = "Compare the addon's stored explain trace to a fresh web-evaluator run (INPUTS DIFF + WALK DIFF)"

import { readFile } from "node:fs/promises"
import type { CommandHelp } from "../../../ops/surface.ts"
import { dataError, inputError } from "../../../lib/exit.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import {
  allBagItems,
  type CompiledOrderedRule,
  explainCapabilities,
  type ItemFacts,
  resolveItemFromInventory,
  type CharacterKnowledge,
  type RuleEvalResult,
  type WalkTrace,
} from "../../../lib/temper-explain-code.ts"
import {
  TEMPER_CHARACTERS_LUA,
  TEMPER_INVENTORY_LUA,
  savedVarsFile,
} from "../../../lib/temper-inventory-paths.ts"
import {
  type MatchedRoute,
  type ParityAddonTrace,
  parityAddonTrace,
  parityNarrow,
  parityRouting,
} from "../../../lib/temper-parity-code.ts"

export const help: CommandHelp = {
  positionals: [
    {
      name: "<itemId>",
      description: "Bare integer item id to compare against the stored addon trace",
      required: true,
    },
  ],
  flags: [
    {
      name: "--char",
      argLabel: "<id>",
      valueShape: "token",
      description: "Character id whose perspective the addon trace was captured from (required)",
      required: true,
    },
    {
      name: "--inventory-path",
      argLabel: "<path>",
      valueShape: "token",
      description: `Path to TemperInventory.lua (default: ${TEMPER_INVENTORY_LUA})`,
    },
    {
      name: "--characters-path",
      argLabel: "<path>",
      valueShape: "token",
      description: `Path to TemperCharacters.lua (default: ${TEMPER_CHARACTERS_LUA})`,
    },
  ],
  examples: [
    "ops temper inventory parity 16424 --char char-2",
    "ops temper inventory parity 16424 --char char-2 --inventory-path TemperInventory.lua",
  ],
}

interface DiffRow {
  readonly field: string
  readonly web: string
  readonly addon: string
}

function fmtNum(n: number | undefined): string {
  return n === undefined ? "(absent)" : String(n)
}

function numericSignalsAgree(web: number | undefined, addon: number | undefined): boolean {
  const w = web ?? 0
  const a = addon ?? 0
  return w === a
}

function computeInputsDiff(
  trace: ParityAddonTrace,
  facts: ItemFacts
): ReadonlyArray<DiffRow> {
  const rows: DiffRow[] = []
  const addon = trace.signals
  const numericChecks: ReadonlyArray<{
    field: string
    web: number | undefined
    addon: number | undefined
  }> = [
    { field: "itemType", web: facts.itemType, addon: addon.itemType },
    {
      field: "specializedItemType",
      web: facts.specializedItemType,
      addon: addon.specializedItemType,
    },
    { field: "filterType", web: facts.filterType, addon: addon.filterType },
    { field: "traitType", web: facts.traitType, addon: addon.traitType },
    { field: "equipType", web: facts.equipType, addon: addon.equipType },
    { field: "armorType", web: facts.armorType, addon: addon.armorType },
    { field: "weaponType", web: facts.weaponType, addon: addon.weaponType },
    { field: "quality", web: facts.quality, addon: addon.quality },
  ]
  for (const check of numericChecks) {
    if (!numericSignalsAgree(check.web, check.addon)) {
      rows.push({ field: check.field, web: fmtNum(check.web), addon: fmtNum(check.addon) })
    }
  }
  const webChain = facts.categoryNodeIds ?? []
  const webLeaf = webChain.length === 0 ? undefined : webChain[webChain.length - 1]
  if (webLeaf !== trace.classification.leafCategoryId) {
    rows.push({
      field: "leafCategoryId",
      web: webLeaf ?? "(absent)",
      addon: trace.classification.leafCategoryId,
    })
  }
  return rows
}

interface WalkDiffRow {
  readonly index: number
  readonly categoryId: string
  readonly web: string
  readonly addon: string
}

type AddonRuleVerdict =
  | { readonly kind: "matched"; readonly action: string }
  | { readonly kind: "rejected"; readonly reason: string; readonly detail?: string }
  | { readonly kind: "skipped" }

function describeAddonVerdict(v: AddonRuleVerdict): string {
  if (v.kind === "matched") return `match(${v.action})`
  if (v.kind === "rejected") {
    return v.detail !== undefined ? `skip(${v.reason}:${v.detail})` : `skip(${v.reason})`
  }
  return "skip(not-evaluated)"
}

function describeWebVerdict(r: RuleEvalResult, assertNever: (value: never) => never): string {
  const v = r.verdict
  if (v.kind === "matched") return `match(${r.action})`
  if (v.kind === "indeterminate") return `indeterminate(${v.reason.kind})`
  switch (v.reason.kind) {
    case "category-mismatch":
      return "skip(category-mismatch)"
    case "condition-fail":
      return `skip(condition-fail:${v.reason.conditionKind})`
    case "container-skip":
      return "skip(container-skip)"
    case "destination-resolve-fail":
      return "skip(destination-resolve-fail)"
    default:
      return assertNever(v.reason as never)
  }
}

function verdictsDiffer(web: RuleEvalResult, addon: AddonRuleVerdict): boolean {
  const webKind = web.verdict.kind
  if (
    addon.kind === "skipped" &&
    webKind === "rejected" &&
    web.verdict.reason.kind === "category-mismatch"
  ) {
    return false
  }
  return webKind !== addon.kind
}

function computeWalkDiff(
  trace: ParityAddonTrace,
  webTrace: WalkTrace,
  rules: ReadonlyArray<CompiledOrderedRule>,
  assertNever: (value: never) => never
): ReadonlyArray<WalkDiffRow> {
  const addonByIndex = new Map<number, AddonRuleVerdict>()
  if (trace.orderedWalk.matched !== undefined) {
    addonByIndex.set(trace.orderedWalk.matched.index, {
      kind: "matched",
      action: trace.orderedWalk.matched.action,
    })
  }
  for (const r of trace.orderedWalk.rejections) {
    addonByIndex.set(r.index, { kind: "rejected", reason: r.reason, detail: r.detail })
  }

  const webByIndex = new Map<number, RuleEvalResult>()
  let webMatchedIndex: number | undefined
  for (const r of webTrace.perRule) {
    webByIndex.set(r.index, r)
    if (r.verdict.kind === "matched" && webMatchedIndex === undefined) {
      webMatchedIndex = r.index
    }
  }

  const addonMatchedIndex = trace.orderedWalk.matched?.index
  const stops: number[] = []
  if (addonMatchedIndex !== undefined) stops.push(addonMatchedIndex)
  if (webMatchedIndex !== undefined) stops.push(webMatchedIndex)
  const compareCap = stops.length === 0 ? Number.POSITIVE_INFINITY : Math.min(...stops)

  const indices = new Set<number>([...addonByIndex.keys(), ...webByIndex.keys()])
  const sorted = Array.from(indices)
    .filter((i) => i <= compareCap)
    .sort((a, b) => a - b)
  const rows: WalkDiffRow[] = []
  for (const i of sorted) {
    const addonV: AddonRuleVerdict = addonByIndex.get(i) ?? { kind: "skipped" }
    const webR = webByIndex.get(i)
    if (webR === undefined) {
      if (addonV.kind !== "skipped") {
        const rule = rules[i]
        rows.push({
          index: i,
          categoryId: rule?.categoryId ?? "(unknown)",
          web: "skip(not-evaluated)",
          addon: describeAddonVerdict(addonV),
        })
      }
      continue
    }
    if (verdictsDiffer(webR, addonV)) {
      const webDesc = describeWebVerdict(webR, assertNever)
      const addonDesc = describeAddonVerdict(addonV)
      rows.push({ index: i, categoryId: webR.categoryId, web: webDesc, addon: addonDesc })
    }
  }
  return rows
}

function renderInputsSection(rows: ReadonlyArray<DiffRow>): string {
  const lines: string[] = ["INPUTS DIFF"]
  if (rows.length === 0) {
    lines.push("  (no divergence)")
  } else {
    for (const row of rows) {
      lines.push(`  ${row.field}  web=${row.web}  addon=${row.addon}`)
    }
  }
  return lines.join("\n")
}

function renderWalkSection(rows: ReadonlyArray<WalkDiffRow>): string {
  const lines: string[] = ["WALK DIFF"]
  if (rows.length === 0) {
    lines.push("  (no divergence)")
  } else {
    for (const row of rows) {
      lines.push(`  rule ${row.index} "${row.categoryId}"   web=${row.web} addon=${row.addon}`)
    }
  }
  return lines.join("\n")
}

export default async function inventoryParity(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const positional = parsed.positionals[0]
  if (positional == null) throw inputError("itemId is required")
  if (!/^\d+$/.test(positional)) {
    throw inputError(`itemId must be a non-negative integer, got: ${positional}`)
  }
  const itemId = Number(positional)

  const charId = parsed.requireString("--char")
  const inventoryPath =
    parsed.string("--inventory-path") ?? (await savedVarsFile("TemperInventory.lua"))
  const charactersPath =
    parsed.string("--characters-path") ?? (await savedVarsFile("TemperCharacters.lua"))

  let inventoryContent: string
  try {
    inventoryContent = await readFile(inventoryPath, "utf8")
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err)
    throw dataError(`could not read TemperInventory.lua at ${inventoryPath}: ${reason}`)
  }

  const [caps, addonTraceModule, routing, narrow] = await Promise.all([
    explainCapabilities(),
    parityAddonTrace(),
    parityRouting(),
    parityNarrow(),
  ])

  const trace = addonTraceModule.loadParityAddonTraceFromContent(inventoryContent, itemId)

  const db = caps.parseInventoryContent(inventoryContent)
  const resolved = resolveItemFromInventory(caps, db, itemId)
  if (resolved === undefined) {
    throw dataError(
      `itemId ${itemId} present in addon trace but not in bag-scan locations of ${inventoryPath}`
    )
  }
  const { item, location } = resolved
  const config = await caps.loadTemperInventoryConfigFromPath(inventoryPath)

  const characters = await caps.loadTemperCharactersFromPath(charactersPath)
  const charactersById = new Map<string, CharacterKnowledge>(characters.map((c) => [c.id, c]))

  const nodeIds = caps.classifyItemToNodeIds(item)
  const facts = caps.cliItemFactsFromInventoryItem(item, nodeIds, location)

  const env = caps.buildCliEvalEnv({
    charactersById,
    characterPriority: config.characterPriority,
    wantedConsumables: config.wantedConsumables,
  })
  const stockGroupByRuleId = caps.computeStockGroups(
    config.orderedRules,
    allBagItems(caps, db),
    ({ item: stockItem, location: stockLocation }) =>
      caps.cliItemFactsFromInventoryItem(
        stockItem,
        caps.classifyItemToNodeIds(stockItem),
        stockLocation
      ),
    env
  )
  const webWalk: WalkTrace = caps.walkRules(config.orderedRules, facts, {
    env,
    stockGroupByRuleId,
  })

  const inputsRows = computeInputsDiff(trace, facts)
  const walkRows = computeWalkDiff(trace, webWalk, config.orderedRules, narrow.assertNever)

  const webMatch: MatchedRoute | undefined =
    webWalk.outcome.kind === "matched"
      ? routing.matchedRouteFrom(webWalk.outcome.action, webWalk.outcome.destination)
      : undefined
  const addonMatched = trace.orderedWalk.matched
  const addonMatch: MatchedRoute | undefined =
    addonMatched === undefined
      ? undefined
      : routing.matchedRouteFrom(addonMatched.action, addonMatched.destination)
  const routingDiff = routing.computeRoutingDiff(charId, item, webMatch, addonMatch)

  process.stdout.write(`${renderInputsSection(inputsRows)}\n\n`)
  process.stdout.write(`${renderWalkSection(walkRows)}\n\n`)
  process.stdout.write(`${routing.renderRoutingSection(routingDiff)}\n`)

  if (inputsRows.length > 0 || walkRows.length > 0 || routingDiff.mismatch) {
    process.exit(1)
  }
}
