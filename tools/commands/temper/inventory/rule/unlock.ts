export const summary = "Set locked:false on a category rule"

import { lockCategoryRule } from "@akasha/temper-items-rules-core/inventory-rule-settings"
import { dataError, inputError } from "../../../../lib/exit.ts"
import { emitJson } from "../../../../lib/format-output.ts"
import { parseArgs } from "../../../../lib/parse-args.ts"
import { inventorySettings } from "../../../../lib/temper-inventory.ts"
import type { CommandHelp } from "../../../../ops/surface.ts"

export const help: CommandHelp = {
  positionals: [
    {
      name: "<id>",
      description: "Rule id to unlock",
      required: true,
    },
  ],
  exits: [{ code: 2, meaning: "rule with the given id was not found" }],
  examples: ["ops temper inventory rule unlock 7913abcd"],
}

export default async function temperInventoryRuleUnlock(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const id = parsed.positionals[0]
  if (id === undefined) throw inputError("rule id is required")

  const settingsAccess = await inventorySettings()
  const settings = await settingsAccess.read()
  const existing = settings.rules.find((r) => r.id === id)
  if (existing === undefined) {
    throw dataError(`rule with id '${id}' not found in user rules`)
  }
  const next = lockCategoryRule(settings, id, false)
  await settingsAccess.write(next)
  process.stdout.write(`${emitJson({ id, locked: false })}\n`)
}
