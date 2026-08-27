
export const summary = "Show one buy rule by id (JSON / --tsv)"

import type { CommandHelp } from "../../../../ops/surface.ts"
import { inputError, dataError } from "../../../../lib/exit.ts"
import { parseArgs } from "../../../../lib/parse-args.ts"
import { emitJson, emitTsv } from "../../../../lib/format-output.ts"
import { BUY_RULE_COLUMNS, inventorySettings } from "../../../../lib/temper-inventory.ts"

export const help: CommandHelp = {
  positionals: [
    {
      name: "<id>",
      description: "Buy-rule id (uuid string assigned at creation)",
      required: true,
    },
  ],
  flags: [
    {
      name: "--tsv",
      description: "Emit a single TSV row instead of JSON",
    },
  ],
  exits: [{ code: 2, meaning: "no buy rule with that id" }],
  examples: [
    "ops temper inventory buy-rule show 6cdb...",
    "ops temper inventory buy-rule show 6cdb... --tsv",
  ],
}

export default async function temperInventoryBuyRuleShow(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const id = parsed.positionals[0]
  if (id === undefined) throw inputError("buy-rule id is required")
  const tsv = parsed.boolean("--tsv")

  const settingsAccess = await inventorySettings()
  const settings = await settingsAccess.read()
  const rule = (settings.buyRules ?? []).find((r) => r.id === id)
  if (rule === undefined) {
    throw dataError(`no buy rule found with id '${id}'`)
  }

  if (tsv) {
    const row = {
      id: rule.id,
      itemId: rule.itemId,
      itemName: rule.itemName,
      targetQuantity: rule.targetQuantity,
      source: rule.source,
      active: rule.active,
      locked: rule.locked,
    }
    process.stdout.write(`${emitTsv([row], BUY_RULE_COLUMNS)}\n`)
    return
  }

  process.stdout.write(`${emitJson(rule)}\n`)
}
