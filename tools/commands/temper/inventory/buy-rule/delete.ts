
export const summary = "Delete a buy rule by id (--force to override the lock guard)"

import type { CommandHelp } from "../../../../ops/surface.ts"
import { codeModule } from "../../../../lib/code-import.ts"
import { inputError, dataError } from "../../../../lib/exit.ts"
import { parseArgs } from "../../../../lib/parse-args.ts"
import { emitJson } from "../../../../lib/format-output.ts"
import {
  assertWriteAllowed,
  inventorySettings,
  type RuleSettings,
} from "../../../../lib/temper-inventory.ts"

const BUY_RULE_SETTINGS = "@temper/game-items-rules-core/buy-rule-settings"

export const help: CommandHelp = {
  positionals: [
    {
      name: "<id>",
      description: "Buy-rule id (uuid string assigned at creation)",
      required: true,
    },
  ],
  flags: [
    {
      name: "--force",
      description: "Override the locked-rule guard and remove the rule",
    },
  ],
  exits: [{ code: 2, meaning: "no buy rule with that id" }],
  examples: [
    "ops temper inventory buy-rule delete 6cdb...",
    "ops temper inventory buy-rule delete 6cdb... --force",
  ],
}

interface BuyRuleTransforms {
  readonly lockBuyRule: (settings: RuleSettings, id: string, locked: boolean) => RuleSettings
  readonly removeBuyRule: (settings: RuleSettings, id: string) => RuleSettings
}

export default async function temperInventoryBuyRuleDelete(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const id = parsed.positionals[0]
  if (id === undefined) throw inputError("buy-rule id is required")
  const force = parsed.boolean("--force")

  const [settingsAccess, transforms] = await Promise.all([
    inventorySettings(),
    codeModule<BuyRuleTransforms>(BUY_RULE_SETTINGS),
  ])
  const settings = await settingsAccess.read()
  const rule = (settings.buyRules ?? []).find((r) => r.id === id)
  if (rule === undefined) {
    throw dataError(`no buy rule found with id '${id}'`)
  }
  assertWriteAllowed(rule, force)

  const unlocked = force ? transforms.lockBuyRule(settings, id, false) : settings
  const next = transforms.removeBuyRule(unlocked, id)
  await settingsAccess.write(next)

  process.stdout.write(`${emitJson(rule)}\n`)
}
