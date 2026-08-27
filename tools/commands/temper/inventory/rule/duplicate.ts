export const summary = "Clone a category rule at sourceIndex+1 (active:false, locked:false)"

import { duplicateCategoryRule } from "@temper/game-items-rules-core/inventory-rule-settings"
import { dataError, inputError } from "../../../../lib/exit.ts"
import { emitJson } from "../../../../lib/format-output.ts"
import { parseArgs } from "../../../../lib/parse-args.ts"
import { inventorySettings } from "../../../../lib/temper-inventory.ts"
import type { CommandHelp } from "../../../../ops/surface.ts"

export const help: CommandHelp = {
  positionals: [
    {
      name: "<id>",
      description: "Rule id to duplicate",
      required: true,
    },
  ],
  exits: [{ code: 2, meaning: "rule with the given id was not found" }],
  examples: ["ops temper inventory rule duplicate 7913abcd"],
}

export default async function temperInventoryRuleDuplicate(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const id = parsed.positionals[0]
  if (id === undefined) throw inputError("rule id is required")

  const settingsAccess = await inventorySettings()
  const settings = await settingsAccess.read()
  const sourceIndex = settings.rules.findIndex((r) => r.id === id)
  if (sourceIndex === -1) {
    throw dataError(`rule with id '${id}' not found in user rules`)
  }
  const next = duplicateCategoryRule(settings, id)
  const clone = next.rules[sourceIndex + 1]
  if (clone === undefined) {
    throw new Error("ruleDuplicate: duplicateCategoryRule produced no clone (impossible)")
  }
  await settingsAccess.write(next)
  process.stdout.write(`${emitJson(clone)}\n`)
}
