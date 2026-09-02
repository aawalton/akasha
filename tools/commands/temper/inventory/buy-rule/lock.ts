export const summary = "Set `locked: true` on a buy rule by id (idempotent)"

import { lockBuyRule } from "@akasha/temper-items-rules-core/buy-rule-settings"
import { dataError, inputError } from "../../../../lib/exit.ts"
import { emitJson } from "../../../../lib/format-output.ts"
import { parseArgs } from "../../../../lib/parse-args.ts"
import { inventorySettings } from "../../../../lib/temper-inventory.ts"
import type { CommandHelp } from "../../../../ops/surface.ts"

export const help: CommandHelp = {
  positionals: [
    {
      name: "<id>",
      description: "Buy-rule id (uuid string assigned at creation)",
      required: true,
    },
  ],
  exits: [{ code: 2, meaning: "no buy rule with that id" }],
  examples: ["ops temper inventory buy-rule lock 6cdb..."],
}

export default async function temperInventoryBuyRuleLock(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const id = parsed.positionals[0]
  if (id === undefined) throw inputError("buy-rule id is required")

  const settingsAccess = await inventorySettings()
  const settings = await settingsAccess.read()
  const rule = (settings.buyRules ?? []).find((r) => r.id === id)
  if (rule === undefined) {
    throw dataError(`no buy rule found with id '${id}'`)
  }

  const next = lockBuyRule(settings, id, true)
  await settingsAccess.write(next)

  const updated = (next.buyRules ?? []).find((r) => r.id === id)
  process.stdout.write(`${emitJson(updated ?? rule)}\n`)
}
