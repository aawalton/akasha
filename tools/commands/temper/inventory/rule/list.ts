
export const summary = "List category rules in priority order (controlled rules prepended, mirroring the addon's compiled view)"

import type { CommandHelp } from "../../../../ops/surface.ts"
import { codeModule } from "../../../../lib/code-import.ts"
import { parseArgs } from "../../../../lib/parse-args.ts"
import { emitJson, emitTsv } from "../../../../lib/format-output.ts"
import {
  type AutomationSettings,
  inventorySettings,
  type Rule,
} from "../../../../lib/temper-inventory.ts"

const CONTROLLED = "@temper/game-items-rules-core/inventory-rule-controlled"

export const help: CommandHelp = {
  flags: [
    {
      name: "--json",
      description: "Emit JSON array instead of TSV",
    },
  ],
  examples: ["ops temper inventory rule list", "ops temper inventory rule list --json"],
}

interface Controlled {
  readonly buildAllControlledRules: (settings: AutomationSettings) => {
    readonly characterRules: readonly Rule[]
    readonly companionRules: readonly Rule[]
  }
}

const COLUMNS = [
  "pos",
  "id",
  "categoryId",
  "action",
  "active",
  "locked",
  "destination",
  "controlled",
] as const

function toRow(rule: Rule, controlled: boolean, pos: number | undefined): Record<string, unknown> {
  return {
    pos,
    id: rule.id,
    categoryId: rule.categoryId,
    action: rule.action,
    active: rule.active,
    locked: rule.locked,
    destination: rule.destination,
    controlled,
  }
}

export default async function temperInventoryRuleList(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const json = parsed.boolean("--json")

  const [settingsAccess, controlled] = await Promise.all([
    inventorySettings(),
    codeModule<Controlled>(CONTROLLED),
  ])
  const [settings, automation] = await Promise.all([
    settingsAccess.read(),
    settingsAccess.readAutomation(),
  ])
  const { characterRules, companionRules } = controlled.buildAllControlledRules(automation)
  const controlledRules = [...characterRules, ...companionRules]

  if (json) {
    const controlledCount = controlledRules.length
    const allRules: readonly Rule[] = [...controlledRules, ...settings.rules]
    const withPos = allRules.map((r, i) => ({
      ...r,
      pos: i < controlledCount ? undefined : i - controlledCount,
    }))
    process.stdout.write(`${emitJson(withPos)}\n`)
    return
  }

  const rows = [
    ...controlledRules.map((r) => toRow(r, true, undefined)),
    ...settings.rules.map((r, i) => toRow(r, false, i)),
  ]
  process.stdout.write(`${emitTsv(rows, COLUMNS)}\n`)
}
