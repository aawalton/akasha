export const summary = "Inspect the compiled rule config (rules / consumables / priority) in TemperInventory.lua"

import type { CommandHelp } from "../../../ops/surface.ts"
import { inputError } from "../../../lib/exit.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import { TEMPER_INVENTORY_LUA, savedVarsFile } from "../../../lib/temper-inventory-paths.ts"
import { loadTemperInventoryConfigFromPath } from "../../../lib/temper-inventory/parse-temper-inventory-config.ts"

const INVENTORY_PATH_FLAG = "--inventory-path"

const SECTION_CHOICES = ["rules", "consumables", "priority", "all"] as const
type Section = (typeof SECTION_CHOICES)[number]

export const help: CommandHelp = {
  flags: [
    {
      name: "--inventory-path",
      argLabel: "<path>",
      valueShape: "token",
      description: "Path to TemperInventory.lua (defaults to the live ESO SavedVariables location)",
      default: TEMPER_INVENTORY_LUA,
    },
    {
      name: "--section",
      argLabel: "<section>",
      valueShape: "token",
      description: "Which section to surface; defaults to 'all' when omitted",
      choices: SECTION_CHOICES,
    },
    {
      name: "--json",
      description: "Emit JSON instead of TSV",
    },
  ],
  examples: [
    "ops temper inventory rules",
    "ops temper inventory rules --section rules",
    "ops temper inventory rules --section consumables --json",
    "ops temper inventory rules --section priority",
    "ops temper inventory rules --inventory-path ./fixture.lua --json",
  ],
}

interface CompiledRule {
  readonly id: string
  readonly action: string
  readonly destination?: string
  readonly categoryId?: string
  readonly [extra: string]: unknown
}

interface CompiledInventoryConfig {
  readonly rules: ReadonlyArray<CompiledRule>
  readonly wantedConsumables: Record<string, unknown>
  readonly characterPriority: ReadonlyArray<string>
}

interface ConfigLoader {
  readonly loadTemperInventoryConfigFromPath: (path: string) => Promise<CompiledInventoryConfig>
}

interface RuleRow {
  readonly index: number
  readonly id: string
  readonly action: string
  readonly destination: string
  readonly categoryId: string
  readonly conditionCount: number
}

interface JsonShape {
  readonly rules?: ReadonlyArray<Omit<RuleRow, "index">>
  readonly wantedConsumables?: Record<string, unknown>
  readonly characterPriority?: ReadonlyArray<string>
}

const RULE_IDENTITY_FIELDS = new Set(["id", "action", "destination", "categoryId"])

function countConditions(rule: CompiledRule): number {
  let n = 0
  for (const key of Object.keys(rule)) {
    if (!RULE_IDENTITY_FIELDS.has(key)) n++
  }
  return n
}

function toRuleRow(rule: CompiledRule, index: number): RuleRow {
  return {
    index,
    id: rule.id,
    action: rule.action,
    destination: rule.destination ?? "",
    categoryId: rule.categoryId ?? "",
    conditionCount: countConditions(rule),
  }
}

function buildJsonShape(config: CompiledInventoryConfig, section: Section): JsonShape {
  const rulesPayload = config.rules.map((r, i) => {
    const row = toRuleRow(r, i)
    return {
      id: row.id,
      action: row.action,
      destination: row.destination,
      categoryId: row.categoryId,
      conditionCount: row.conditionCount,
    }
  })

  if (section === "rules") return { rules: rulesPayload }
  if (section === "consumables") return { wantedConsumables: config.wantedConsumables }
  if (section === "priority") return { characterPriority: config.characterPriority }
  return {
    rules: rulesPayload,
    wantedConsumables: config.wantedConsumables,
    characterPriority: config.characterPriority,
  }
}

function summarizeConsumable(value: unknown): string {
  if (Array.isArray(value)) return `[${value.length} char(s)]`
  if (value !== null && typeof value === "object") {
    const keys = Object.keys(value)
    return `{${keys.length} field(s): ${keys.slice(0, 3).join(", ")}}`
  }
  if (value === null) return "(null)"
  return String(value)
}

function formatRulesTsv(rules: ReadonlyArray<CompiledRule>): string {
  if (rules.length === 0) return "(no compiled rules)"
  const lines: string[] = []
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i]
    if (rule === undefined) continue
    const row = toRuleRow(rule, i)
    lines.push(
      [row.index, row.id, row.action, row.destination, row.categoryId, row.conditionCount].join(
        "\t"
      )
    )
  }
  return lines.join("\n")
}

function formatConsumablesTsv(wanted: Record<string, unknown>): string {
  const keys = Object.keys(wanted)
  if (keys.length === 0) return "(no wanted consumables)"
  const lines: string[] = []
  for (const itemId of keys) {
    lines.push(`${itemId}\t${summarizeConsumable(wanted[itemId])}`)
  }
  return lines.join("\n")
}

function formatPriorityTsv(priority: ReadonlyArray<string>): string {
  if (priority.length === 0) return "(no character priority)"
  return priority.join("\n")
}

function formatAllSummary(config: CompiledInventoryConfig): string {
  const lines: string[] = []
  lines.push(`# rules (${config.rules.length})`)
  lines.push(formatRulesTsv(config.rules))
  lines.push("")
  lines.push(`# consumables (${Object.keys(config.wantedConsumables).length})`)
  lines.push(formatConsumablesTsv(config.wantedConsumables))
  lines.push("")
  lines.push(`# priority (${config.characterPriority.length})`)
  lines.push(formatPriorityTsv(config.characterPriority))
  return lines.join("\n")
}

function formatTsv(config: CompiledInventoryConfig, section: Section): string {
  if (section === "rules") return formatRulesTsv(config.rules)
  if (section === "consumables") return formatConsumablesTsv(config.wantedConsumables)
  if (section === "priority") return formatPriorityTsv(config.characterPriority)
  return formatAllSummary(config)
}

function supplied(args: readonly string[], flag: string): boolean {
  for (const token of args) {
    if (token === "--") return false
    if (token === flag || token.startsWith(`${flag}=`)) return true
  }
  return false
}

async function parseSection(value: string | undefined): Promise<Section> {
  if (value === undefined) return "all"
  if (value !== "rules" && value !== "consumables" && value !== "priority" && value !== "all") {
    throw inputError(
      `--section: invalid value "${value}" (expected one of: ${SECTION_CHOICES.join(", ")})`
    )
  }
  return value
}

export default async function temperInventoryRules(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const inventoryPath = supplied(args, INVENTORY_PATH_FLAG)
    ? parsed.requireString(INVENTORY_PATH_FLAG)
    : await savedVarsFile("TemperInventory.lua")
  const sectionFlag = parsed.string("--section")
  const json = parsed.boolean("--json")

  const section = await parseSection(sectionFlag)
  const config = await loadTemperInventoryConfigFromPath(inventoryPath)

  if (json) {
    process.stdout.write(`${JSON.stringify(buildJsonShape(config, section))}\n`)
    return
  }

  process.stdout.write(`${formatTsv(config, section)}\n`)
}
