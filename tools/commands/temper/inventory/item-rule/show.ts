
export const summary = "Show one item rule by id (JSON / --tsv)"

import type { CommandHelp } from "../../../../ops/surface.ts"
import { inputError, dataError } from "../../../../lib/exit.ts"
import { parseArgs } from "../../../../lib/parse-args.ts"
import { emitJson, emitTsv } from "../../../../lib/format-output.ts"
import {
  inventorySettings,
  ITEM_RULE_COLUMNS,
  itemRuleRow,
} from "../../../../lib/temper-inventory.ts"

export const help: CommandHelp = {
  positionals: [
    {
      name: "<id>",
      description: "Item-rule id (uuid string assigned at creation)",
      required: true,
    },
  ],
  flags: [
    {
      name: "--tsv",
      description: "Emit a single TSV row instead of JSON",
    },
  ],
  exits: [{ code: 2, meaning: "no item rule with that id" }],
  examples: [
    "ops temper inventory item-rule show 6cdb...",
    "ops temper inventory item-rule show 6cdb... --tsv",
  ],
}

export default async function temperInventoryItemRuleShow(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const id = parsed.positionals[0]
  if (id === undefined) throw inputError("item-rule id is required")
  const tsv = parsed.boolean("--tsv")

  const settingsAccess = await inventorySettings()
  const settings = await settingsAccess.read()
  const rule = (settings.itemRules ?? []).find((r) => r.id === id)
  if (rule === undefined) {
    throw dataError(`no item rule found with id '${id}'`)
  }

  if (tsv) {
    process.stdout.write(`${emitTsv([itemRuleRow(rule)], ITEM_RULE_COLUMNS)}\n`)
    return
  }

  process.stdout.write(`${emitJson(rule)}\n`)
}
