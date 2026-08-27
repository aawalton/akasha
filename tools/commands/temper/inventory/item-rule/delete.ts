export const summary = "Delete an item rule by id (--force to override the lock guard)"

import { lockItemRule, removeItemRule } from "@temper/game-items-rules-core/inventory-rule-settings"
import { dataError, inputError } from "../../../../lib/exit.ts"
import { emitJson } from "../../../../lib/format-output.ts"
import { parseArgs } from "../../../../lib/parse-args.ts"
import { assertWriteAllowed, inventorySettings } from "../../../../lib/temper-inventory.ts"
import type { CommandHelp } from "../../../../ops/surface.ts"

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
      name: "--force",
      description: "Override the locked-rule guard and remove the rule",
    },
  ],
  exits: [{ code: 2, meaning: "no item rule with that id" }],
  examples: [
    "ops temper inventory item-rule delete 6cdb...",
    "ops temper inventory item-rule delete 6cdb... --force",
  ],
}

export default async function temperInventoryItemRuleDelete(
  args: readonly string[]
): Promise<void> {
  const parsed = parseArgs(help, args)
  const id = parsed.positionals[0]
  if (id === undefined) throw inputError("item-rule id is required")
  const force = parsed.boolean("--force")

  const settingsAccess = await inventorySettings()
  const settings = await settingsAccess.read()
  const rule = (settings.itemRules ?? []).find((r) => r.id === id)
  if (rule === undefined) {
    throw dataError(`no item rule found with id '${id}'`)
  }
  assertWriteAllowed(rule, force)

  const unlocked = force ? lockItemRule(settings, id, false) : settings
  const next = removeItemRule(unlocked, id)
  await settingsAccess.write(next)

  process.stdout.write(`${emitJson(rule)}\n`)
}
