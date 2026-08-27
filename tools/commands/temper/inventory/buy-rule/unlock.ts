
export const summary = "Set `locked: false` on a buy rule by id (idempotent)"

import type { CommandHelp } from "../../../../ops/surface.ts"
import { codeModule } from "../../../../lib/code-import.ts"
import { inputError, dataError } from "../../../../lib/exit.ts"
import { parseArgs } from "../../../../lib/parse-args.ts"
import { emitJson } from "../../../../lib/format-output.ts"
import { inventorySettings, type RuleSettings } from "../../../../lib/temper-inventory.ts"

const BUY_RULE_SETTINGS = "@temper/game-items-rules-core/buy-rule-settings"

export const help: CommandHelp = {
  positionals: [
    {
      name: "<id>",
      description: "Buy-rule id (uuid string assigned at creation)",
      required: true,
    },
  ],
  exits: [{ code: 2, meaning: "no buy rule with that id" }],
  examples: ["ops temper inventory buy-rule unlock 6cdb..."],
}

interface BuyRuleTransforms {
  readonly lockBuyRule: (settings: RuleSettings, id: string, locked: boolean) => RuleSettings
}

export default async function temperInventoryBuyRuleUnlock(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const id = parsed.positionals[0]
  if (id === undefined) throw inputError("buy-rule id is required")

  const [settingsAccess, transforms] = await Promise.all([
    inventorySettings(),
    codeModule<BuyRuleTransforms>(BUY_RULE_SETTINGS),
  ])
  const settings = await settingsAccess.read()
  const rule = (settings.buyRules ?? []).find((r) => r.id === id)
  if (rule === undefined) {
    throw dataError(`no buy rule found with id '${id}'`)
  }

  const next = transforms.lockBuyRule(settings, id, false)
  await settingsAccess.write(next)

  const updated = (next.buyRules ?? []).find((r) => r.id === id)
  process.stdout.write(`${emitJson(updated ?? rule)}\n`)
}
