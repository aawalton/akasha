export const summary = "Trace why a recipe / motif / script item resolves to its in-game action (priority walk)"

import { readFile } from "node:fs/promises"
import type { CommandHelp } from "../../../ops/surface.ts"
import { dataError, inputError } from "../../../lib/exit.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import {
  formatExplainWalk,
  type JsonOutput,
  type OutcomeJson,
  type RuleTraceRow,
  type TtcBreakdown,
} from "../../../lib/temper-explain-walk.ts"
import {
  allBagItems,
  explainCapabilities,
  resolveItemFromInventory,
  type CharacterKnowledge,
  type IndeterminateReason,
  type InventoryItemData,
  type ItemFacts,
  type RejectionReason,
  type RuleEvalResult,
  type WalkOutcome,
} from "../../../lib/temper-explain-code.ts"
import {
  TEMPER_CHARACTERS_LUA,
  TEMPER_INVENTORY_LUA,
  savedVarsFile,
} from "../../../lib/temper-inventory-paths.ts"

export const help: CommandHelp = {
  positionals: [
    {
      name: "<itemIdOrLink>",
      description: "Bare integer item id, or a full ESO item link (|H1:item:...|h|h)",
      required: true,
    },
  ],
  flags: [
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
    {
      name: "--char",
      argLabel: "<id>",
      valueShape: "token",
      description:
        "Scope the bag-scan lookup to one character's location key (the numeric ESO " +
        "character id). Without this flag, the freshest-by-lastScanned location wins " +
        "when the same item id appears in multiple slots.",
    },
    {
      name: "--json",
      description: "Emit JSON object instead of TSV",
    },
  ],
  examples: [
    "ops temper inventory explain 16424",
    "ops temper inventory explain '|H1:item:16424:4:1:0:0:0:0:0:0:0:0:0:0:0:0:7:0:0:0:0:0|h|h'",
    "ops temper inventory explain 16424 --char 8796093022338107",
    "ops temper inventory explain 16424 --json",
  ],
}

function describeRejection(reason: RejectionReason): string {
  if (reason.kind === "category-mismatch") {
    return `category-mismatch (rule.categoryId=${reason.ruleCategoryId})`
  }
  if (reason.kind === "condition-fail") {
    return reason.detail !== undefined
      ? `condition-fail:${reason.conditionKind} (${reason.detail})`
      : `condition-fail:${reason.conditionKind}`
  }
  if (reason.kind === "container-skip") {
    return reason.detail !== undefined ? `container-skip (${reason.detail})` : "container-skip"
  }
  return reason.detail !== undefined
    ? `destination-resolve-fail (${reason.detail})`
    : "destination-resolve-fail"
}

function describeIndeterminate(reason: IndeterminateReason): string {
  if (reason.kind === "category-unknown") {
    return `category-unknown (missing=${reason.missingSignal})`
  }
  if (reason.kind === "condition-unknown") {
    return `condition-unknown:${reason.conditionKind} (missing=${reason.missingSignal})`
  }
  return reason.detail !== undefined
    ? `destination-unknown (${reason.detail})`
    : "destination-unknown"
}

function ruleResultToRow(r: RuleEvalResult): RuleTraceRow {
  let verdict: RuleTraceRow["verdict"] = "matched"
  let verdictDetail: string | null = null
  if (r.verdict.kind === "rejected") {
    verdict = "rejected"
    verdictDetail = describeRejection(r.verdict.reason)
  } else if (r.verdict.kind === "indeterminate") {
    verdict = "indeterminate"
    verdictDetail = describeIndeterminate(r.verdict.reason)
  }
  return {
    index: r.index,
    ruleId: r.ruleId ?? null,
    categoryId: r.categoryId,
    action: r.action,
    destination: r.destination ?? null,
    verdict,
    verdictDetail,
    resolvedDestination: r.resolvedDestination ?? null,
  }
}

function outcomeToJson(outcome: WalkOutcome): OutcomeJson {
  if (outcome.kind === "matched") {
    return {
      kind: "matched",
      action: outcome.action,
      destination: outcome.destination ?? null,
      label: outcome.label,
      indeterminateRules: [],
    }
  }
  if (outcome.kind === "implicit-terminal") {
    return {
      kind: "implicit-terminal",
      action: outcome.action,
      destination: null,
      label: outcome.label,
      indeterminateRules: [],
    }
  }
  return {
    kind: "indeterminate",
    action: outcome.provisionalMatch?.action ?? null,
    destination: outcome.provisionalMatch?.destination ?? null,
    label: outcome.provisionalMatch?.label ?? null,
    indeterminateRules: outcome.indeterminateRules.map(ruleResultToRow),
  }
}

function ttcBreakdownFromItem(item: InventoryItemData): TtcBreakdown {
  return {
    saleAvg: item.saleAvg ?? null,
    minPrice: item.minPrice ?? null,
    amountCount: item.amountCount ?? null,
    saleAmountCount: item.saleAmountCount ?? null,
    estimatedValue: item.estimatedValue ?? null,
    merchantValue: item.merchantValue ?? null,
    replacementCost: item.replacementCost ?? null,
  }
}

function itemKeyLabel(facts: ItemFacts): string | null {
  const k = facts.itemKey
  if (k === undefined) return null
  if (k.kind === "recipe") return `recipe:${k.resultItemId}`
  if (k.kind === "motif") {
    return `motif:${k.styleId}:${k.chapterId === null ? "master" : k.chapterId}`
  }
  if (k.kind === "script") return `script:${k.scriptId}`
  return `consumable:${k.itemId}`
}

export default async function temperInventoryExplain(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const positional = parsed.positionals[0]
  if (positional == null) throw inputError("item id or link is required")

  const caps = await explainCapabilities()

  const itemId = /^\d+$/.test(positional)
    ? (Number.isInteger(Number(positional)) && Number(positional) >= 0 ? Number(positional) : null)
    : (caps.parseItemLink(positional)?.itemId ?? null)
  if (itemId === null) {
    throw inputError(`could not parse item id or link: ${positional}`)
  }

  const inventoryPath =
    parsed.string("--inventory-path") ?? (await savedVarsFile("TemperInventory.lua"))
  const charactersPath =
    parsed.string("--characters-path") ?? (await savedVarsFile("TemperCharacters.lua"))
  const charId = parsed.string("--char")
  const json = parsed.boolean("--json")

  let inventoryContent: string
  try {
    inventoryContent = await readFile(inventoryPath, "utf8")
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err)
    throw dataError(`could not read TemperInventory.lua at ${inventoryPath}: ${reason}`)
  }

  const db = caps.parseInventoryContent(inventoryContent)
  if (charId !== undefined && db.locations[charId] === undefined) {
    const known = Object.keys(db.locations)
    throw inputError(
      `--char ${charId} did not match any scanned location; known location keys: ${known.length === 0 ? "(none)" : known.join(", ")}`
    )
  }
  const resolved = resolveItemFromInventory(caps, db, itemId, charId)
  const config = await caps.loadTemperInventoryConfigFromPath(inventoryPath)

  const characters = await caps.loadTemperCharactersFromPath(charactersPath)
  const charactersById = new Map<string, CharacterKnowledge>(characters.map((c) => [c.id, c]))

  const env = caps.buildCliEvalEnv({
    charactersById,
    characterPriority: config.characterPriority,
    wantedConsumables: config.wantedConsumables,
  })

  let perRule: ReadonlyArray<RuleTraceRow> = []
  let outcome: OutcomeJson = {
    kind: "implicit-terminal",
    action: "nothing",
    destination: null,
    label: "Keep",
    indeterminateRules: [],
  }
  let itemKey: string | null = null
  let categoryNodeIds: ReadonlyArray<string> | null = null
  let itemName: string | null = null
  let itemLink: string | null = null
  let ttc: TtcBreakdown | null = null

  if (resolved !== undefined) {
    const { item, location } = resolved
    itemName = item.itemName
    itemLink = item.itemLink
    ttc = ttcBreakdownFromItem(item)
    const nodeIds = caps.classifyItemToNodeIds(item)
    const facts = caps.cliItemFactsFromInventoryItem(item, nodeIds, location)
    categoryNodeIds = facts.categoryNodeIds ?? null
    itemKey = itemKeyLabel(facts)
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
    const trace = caps.walkRules(config.orderedRules, facts, { env, stockGroupByRuleId })
    perRule = trace.perRule.map(ruleResultToRow)
    outcome = outcomeToJson(trace.outcome)
  }

  const out: JsonOutput = {
    itemId,
    itemName,
    itemLink,
    categoryNodeIds,
    itemKey,
    ttc,
    perRule,
    outcome,
  }

  if (json) {
    process.stdout.write(`${JSON.stringify(out)}\n`)
    return
  }
  process.stdout.write(formatExplainWalk(out))
}
