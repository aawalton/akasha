export const summary = "Remove a category rule (--force unlocks-then-removes for locked rules)"

import {
  lockCategoryRule,
  removeCategoryRule,
} from "@akasha/temper-items-rules-core/inventory-rule-settings"
import { dataError, inputError } from "../../../../lib/exit.ts"
import { emitJson } from "../../../../lib/format-output.ts"
import { parseArgs } from "../../../../lib/parse-args.ts"
import { assertWriteAllowed, inventorySettings } from "../../../../lib/temper-inventory.ts"
import type { CommandHelp } from "../../../../ops/surface.ts"

export const help: CommandHelp = {
  positionals: [
    {
      name: "<id>",
      description: "Rule id to delete",
      required: true,
    },
  ],
  flags: [
    {
      name: "--force",
      description: "Bypass the locked-rule guard",
    },
  ],
  exits: [{ code: 2, meaning: "rule with the given id was not found" }],
  examples: [
    "ops temper inventory rule delete 7913abcd",
    "ops temper inventory rule delete 7913abcd --force",
  ],
}

export default async function temperInventoryRuleDelete(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const id = parsed.positionals[0]
  if (id === undefined) throw inputError("rule id is required")
  const force = parsed.boolean("--force")

  const settingsAccess = await inventorySettings()
  const settings = await settingsAccess.read()
  const existing = settings.rules.find((r) => r.id === id)
  if (existing === undefined) {
    throw dataError(`rule with id '${id}' not found in user rules`)
  }
  assertWriteAllowed(existing, force)

  const unlocked =
    existing.locked === true && force ? lockCategoryRule(settings, id, false) : settings
  const next = removeCategoryRule(unlocked, id)
  await settingsAccess.write(next)
  process.stdout.write(`${emitJson({ deletedId: id })}\n`)
}
