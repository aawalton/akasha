export const summary = "Set `locked: true` on an item rule by id (idempotent)"

import { lockItemRule } from "@temper/game-items-rules-core/inventory-rule-settings"
import { dataError, inputError } from "../../../../lib/exit.ts"
import { emitJson } from "../../../../lib/format-output.ts"
import { parseArgs } from "../../../../lib/parse-args.ts"
import { inventorySettings } from "../../../../lib/temper-inventory.ts"
import type { CommandHelp } from "../../../../ops/surface.ts"

export const help: CommandHelp = {
  positionals: [
    {
      name: "<id>",
      description: "Item-rule id (uuid string assigned at creation)",
      required: true,
    },
  ],
  exits: [{ code: 2, meaning: "no item rule with that id" }],
  examples: ["ops temper inventory item-rule lock 6cdb..."],
}

export default async function temperInventoryItemRuleLock(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const id = parsed.positionals[0]
  if (id === undefined) throw inputError("item-rule id is required")

  const settingsAccess = await inventorySettings()
  const settings = await settingsAccess.read()
  const rule = (settings.itemRules ?? []).find((r) => r.id === id)
  if (rule === undefined) {
    throw dataError(`no item rule found with id '${id}'`)
  }

  const next = lockItemRule(settings, id, true)
  await settingsAccess.write(next)

  const updated = (next.itemRules ?? []).find((r) => r.id === id)
  process.stdout.write(`${emitJson(updated ?? rule)}\n`)
}
