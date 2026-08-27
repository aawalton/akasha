export const summary =
  "Print one rule's full shape — looks up user rules first, then derived controlled rules"

import { buildAllControlledRules } from "@temper/game-items-rules-core/inventory-rule-controlled"
import type { CategoryRule } from "@temper/game-items-rules-core/inventory-rule-types"
import { dataError, inputError } from "../../../../lib/exit.ts"
import { emitJson, emitTsv } from "../../../../lib/format-output.ts"
import { parseArgs } from "../../../../lib/parse-args.ts"
import { inventorySettings, RULE_SHOW_COLUMNS } from "../../../../lib/temper-inventory.ts"
import type { CommandHelp } from "../../../../ops/surface.ts"

export const help: CommandHelp = {
  positionals: [
    {
      name: "<id>",
      description: "Rule id (8-char id, or controlled rule id like `controlled:character:food`)",
      required: true,
    },
  ],
  flags: [
    {
      name: "--json",
      description: "Emit JSON (default)",
    },
    {
      name: "--tsv",
      description: "Emit a single TSV row (id, categoryId, action, active, locked, destination)",
    },
  ],
  exits: [{ code: 2, meaning: "rule with the given id was not found" }],
  examples: [
    "ops temper inventory rule show 7913abcd",
    "ops temper inventory rule show controlled:character:food --tsv",
  ],
}

function emit(rule: CategoryRule, tsv: boolean): undefined {
  if (tsv) {
    process.stdout.write(
      `${emitTsv(
        [
          {
            id: rule.id,
            categoryId: rule.categoryId,
            action: rule.action,
            active: rule.active,
            locked: rule.locked,
            destination: rule.destination,
          },
        ],
        RULE_SHOW_COLUMNS
      )}\n`
    )
    return undefined
  }
  process.stdout.write(`${emitJson(rule)}\n`)
  return undefined
}

export default async function temperInventoryRuleShow(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const id = parsed.positionals[0]
  if (id === undefined) throw inputError("rule id is required")
  const tsv = parsed.boolean("--tsv")

  const settingsAccess = await inventorySettings()
  const [settings, automation] = await Promise.all([
    settingsAccess.read(),
    settingsAccess.readAutomation(),
  ])

  const userRule = settings.rules.find((r) => r.id === id)
  if (userRule !== undefined) {
    emit(userRule, tsv)
    return
  }

  const { characterRules, companionRules } = buildAllControlledRules(automation)
  const controlledRule = [...characterRules, ...companionRules].find((r) => r.id === id)
  if (controlledRule !== undefined) {
    emit(controlledRule, tsv)
    return
  }

  throw dataError(`rule with id '${id}' not found in user rules or derived controlled rules`)
}
