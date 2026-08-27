export const summary = "Offline reproduction of /temperplan: composes computeAllRuleAffectedItems → applyDestinationCapacityFilter → buildManagementPlan against the workstation TemperInventory.lua and TemperCharacters.lua"

import { readFile } from "node:fs/promises"
import type { CommandHelp } from "../../../ops/surface.ts"
import { dataError, inputError } from "../../../lib/exit.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import {
  TEMPER_CHARACTERS_LUA,
  TEMPER_INVENTORY_LUA,
} from "../../../lib/temper-inventory-paths.ts"
import {
  type CharacterKnowledge,
  type ClassifiedInventoryItem,
  type CharacterSession,
  classifyItem,
  type CompiledOrderedRule,
  type InventoryDatabase,
  inventoryParser,
  capacityFilter,
  managementPlan,
  type ManagementPlan,
  parseCharacters,
  parseConfig,
  planChecklist,
  planInputs,
  type PlanItem,
  ruleMatcher,
  utilsNarrow,
  type VenueStop,
} from "../../../lib/temper-inventory-plan-code.ts"

export const help: CommandHelp = {
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
      name: "--snapshot",
      argLabel: "<id>",
      valueShape: "token",
      description: "[NOT YET IMPLEMENTED] Snapshot id for the pages-DB ingest path.",
    },
    {
      name: "--from-pages",
      description:
        "[NOT YET IMPLEMENTED] Read inventory from a Supabase snapshot " +
        "instead of the workstation file. Throws InputError today.",
    },
    {
      name: "--json",
      description: "Emit the raw ManagementPlan shape as pretty-printed JSON",
    },
    {
      name: "--checklist",
      description:
        "Emit the two-level login/venue-stop action checklist (character logins " +
        "and venue stops, never per-item) instead of the default /temperplan mirror",
    },
  ],
  examples: [
    "ops temper inventory plan",
    "ops temper inventory plan --inventory-path ./fixture.lua --json",
  ],
}

interface LocationRow {
  readonly displayName: string
  readonly bags: Record<string, Record<string, unknown>>
}

interface VenueRow {
  label: string
  verbs: ReadonlyMap<string, number>
}

function aggregateVenueRows(
  plan: ManagementPlan,
  assertNever: (value: never) => never
): readonly VenueRow[] {
  const labelToVerbs = new Map<string, Map<string, number>>()
  for (const session of plan.sessions) addSessionToRows(session, labelToVerbs, assertNever)
  return Array.from(labelToVerbs, ([label, verbs]) => ({ label, verbs }))
}

function addSessionToRows(
  session: CharacterSession,
  labelToVerbs: Map<string, Map<string, number>>,
  assertNever: (value: never) => never
): undefined {
  for (const venue of session.venues) addVenueStopToRows(venue, labelToVerbs, assertNever)
  return undefined
}

function addVenueStopToRows(
  venue: VenueStop,
  labelToVerbs: Map<string, Map<string, number>>,
  assertNever: (value: never) => never
): undefined {
  let verbs = labelToVerbs.get(venue.label)
  if (verbs === undefined) {
    verbs = new Map()
    labelToVerbs.set(venue.label, verbs)
  }
  for (const group of venue.actionGroups) {
    for (const item of group.items) addItemToVerbs(item, verbs, assertNever)
  }
  return undefined
}

function addItemToVerbs(
  item: PlanItem,
  verbs: Map<string, number>,
  assertNever: (value: never) => never
): undefined {
  const verb = actionToVerb(item.action, undefined, assertNever)
  verbs.set(verb, (verbs.get(verb) ?? 0) + item.stackCount)
  return undefined
}

const PLAN_HEADER = "[TemperInventory] Plan:"

function formatPlanText(
  plan: ManagementPlan,
  assertNever: (value: never) => never
): string {
  const rows = aggregateVenueRows(plan, assertNever)
  if (rows.length === 0) return `${PLAN_HEADER}\n  (no actions pending)\n`
  const lines: string[] = [PLAN_HEADER]
  for (const row of rows) {
    const parts: string[] = []
    for (const [verb, count] of row.verbs) parts.push(`${verb} ${count}`)
    if (parts.length === 0) continue
    lines.push(`  ${row.label} — ${parts.join(", ")}`)
  }
  return `${lines.join("\n")}\n`
}

function actionToVerb(
  action: string,
  destination: string | undefined,
  assertNever: (value: never) => never
): string {
  switch (action) {
    case "sell":
    case "destroy":
    case "fence-sell":
      return "sell"
    case "fence-launder":
      return "launder"
    case "list":
      return "list"
    case "mail":
      return "mail"
    case "deconstruct":
      return "deconstruct"
    case "refine":
      return "refine"
    case "research":
      return "research"
    case "character-equip":
    case "companion-equip":
      return "equip"
    case "stock":
      return "stock"
    case "move-to":
      return destination?.startsWith("character:") === true ? "withdraw" : "deposit"
    case "use":
      return "use"
    case "open":
      return "open"
    case "nothing":
    case "lock":
    case "unlock":
      return action
    default:
      return assertNever(action as never)
  }
}

function classifyInventoryForMatcher(
  db: InventoryDatabase,
  classifyItemToNodeIds: (item: unknown) => readonly string[]
): readonly ClassifiedInventoryItem[] {
  const out: ClassifiedInventoryItem[] = []
  const locations = (db as { locations: Record<string, LocationRow> }).locations
  for (const [locationKey, location] of Object.entries(locations)) {
    for (const [bagIdStr, slots] of Object.entries(location.bags)) {
      for (const item of Object.values(slots)) {
        out.push({
          item,
          locationKey,
          locationDisplayName: location.displayName,
          nodeIds: classifyItemToNodeIds(item),
          bagId: Number(bagIdStr),
        })
      }
    }
  }
  return out
}

async function readInventoryContent(path: string): Promise<string> {
  try {
    return await readFile(path, "utf8")
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err)
    throw dataError(`could not read TemperInventory.lua at ${path}: ${reason}`)
  }
}

export default async function inventoryPlan(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  if (parsed.boolean("--from-pages") || parsed.string("--snapshot") !== undefined) {
    throw inputError(
      "--from-pages and --snapshot are not yet implemented in this commit. " +
        "Use the workstation-file path (default) until the pages-DB ingest lands."
    )
  }

  const inputs = await planInputs()
  const inventoryPath = parsed.string("--inventory-path") ?? inputs.DEFAULT_INVENTORY_PATH
  const charactersPath = parsed.string("--characters-path") ?? inputs.DEFAULT_CHARACTERS_PATH
  const json = parsed.boolean("--json")
  const checklist = parsed.boolean("--checklist")

  const inventoryContent = await readInventoryContent(inventoryPath)
  const [parser, configModule, charactersModule, classifier, narrow] = await Promise.all([
    inventoryParser(),
    parseConfig(),
    parseCharacters(),
    classifyItem(),
    utilsNarrow(),
  ])
  const db = parser.parseInventoryContent(inventoryContent)
  const config = configModule.parseTemperInventoryConfig(inventoryContent)

  const characters = await charactersModule.loadTemperCharactersFromPath(charactersPath)
  const charactersById = new Map<string, CharacterKnowledge>(characters.map((c) => [c.id, c]))

  const context = inputs.buildMatcherContext(config, charactersById, db)
  const classifiedItems = classifyInventoryForMatcher(db, classifier.classifyItemToNodeIds)
  const orderedRules: readonly CompiledOrderedRule[] = config.orderedRules.map((rule, i) => ({
    ...rule,
    id: config.rules[i]?.id ?? `rule#${i}`,
  }))
  const itemRules = [] as const

  const [matcher, filter, builder] = await Promise.all([
    ruleMatcher(),
    capacityFilter(),
    managementPlan(),
  ])
  const matched = matcher.computeAllRuleAffectedItems(
    orderedRules,
    classifiedItems,
    context,
    itemRules
  )
  const filtered = filter.applyDestinationCapacityFilter(
    orderedRules,
    itemRules,
    matched.ruleMap,
    db
  )
  const plan = builder.buildManagementPlan(orderedRules, itemRules, filtered, db, context)

  if (json) {
    process.stdout.write(`${JSON.stringify(plan, null, 2)}\n`)
    return
  }
  if (checklist) {
    process.stdout.write((await planChecklist()).formatPlanChecklist(plan))
    return
  }
  process.stdout.write(formatPlanText(plan, narrow.assertNever))
}
