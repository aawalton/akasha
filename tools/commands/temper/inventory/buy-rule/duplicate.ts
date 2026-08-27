export const summary = "Duplicate a buy rule by id (clone is unlocked + inactive)"

import { duplicateBuyRule } from "@temper/game-items-rules-core/buy-rule-settings"
import { dataError, inputError } from "../../../../lib/exit.ts"
import { emitJson } from "../../../../lib/format-output.ts"
import { parseArgs } from "../../../../lib/parse-args.ts"
import { inventorySettings } from "../../../../lib/temper-inventory.ts"
import type { CommandHelp } from "../../../../ops/surface.ts"

export const help: CommandHelp = {
  positionals: [
    {
      name: "<id>",
      description: "Buy-rule id (uuid string assigned at creation) of the rule to duplicate",
      required: true,
    },
  ],
  exits: [{ code: 2, meaning: "no buy rule with that id" }],
  examples: ["ops temper inventory buy-rule duplicate 6cdb..."],
}

export default async function temperInventoryBuyRuleDuplicate(
  args: readonly string[]
): Promise<void> {
  const parsed = parseArgs(help, args)
  const id = parsed.positionals[0]
  if (id === undefined) throw inputError("buy-rule id is required")

  const settingsAccess = await inventorySettings()
  const settings = await settingsAccess.read()
  const sourceIndex = (settings.buyRules ?? []).findIndex((r) => r.id === id)
  if (sourceIndex === -1) {
    throw dataError(`no buy rule found with id '${id}'`)
  }

  const next = duplicateBuyRule(settings, id)
  const clone = (next.buyRules ?? [])[sourceIndex + 1]
  if (clone === undefined) {
    throw new Error("duplicateBuyRule did not insert a clone — settings shape is corrupt")
  }
  await settingsAccess.write(next)

  process.stdout.write(`${emitJson(clone)}\n`)
}
