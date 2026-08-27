
export const summary = "List every per-item rule on settings.inventory.itemRules (TSV / --json)"

import type { CommandHelp } from "../../../../ops/surface.ts"
import { parseArgs } from "../../../../lib/parse-args.ts"
import { emitJson, emitTsv } from "../../../../lib/format-output.ts"
import {
  inventorySettings,
  ITEM_RULE_COLUMNS,
  itemRuleRow,
} from "../../../../lib/temper-inventory.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--json",
      description: "Emit the raw `itemRules` array as JSON instead of TSV",
    },
  ],
  examples: ["ops temper inventory item-rule list", "ops temper inventory item-rule list --json"],
}

export default async function temperInventoryItemRuleList(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const json = parsed.boolean("--json")

  const settingsAccess = await inventorySettings()
  const settings = await settingsAccess.read()
  const itemRules = settings.itemRules ?? []

  if (json) {
    process.stdout.write(`${emitJson(itemRules)}\n`)
    return
  }

  process.stdout.write(`${emitTsv(itemRules.map(itemRuleRow), ITEM_RULE_COLUMNS)}\n`)
}
