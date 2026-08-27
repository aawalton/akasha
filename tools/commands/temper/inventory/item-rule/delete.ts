
export const summary = "Delete an item rule by id (--force to override the lock guard)"

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

const RULE_SETTINGS = "@temper/game-items-rules-core/inventory-rule-settings"

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

interface RuleTransforms {
  readonly lockItemRule: (settings: RuleSettings, id: string, locked: boolean) => RuleSettings
  readonly removeItemRule: (settings: RuleSettings, id: string) => RuleSettings
}

export default async function temperInventoryItemRuleDelete(
  args: readonly string[]
): Promise<void> {
  const parsed = parseArgs(help, args)
  const id = parsed.positionals[0]
  if (id === undefined) throw inputError("item-rule id is required")
  const force = parsed.boolean("--force")

  const [settingsAccess, transforms] = await Promise.all([
    inventorySettings(),
    codeModule<RuleTransforms>(RULE_SETTINGS),
  ])
  const settings = await settingsAccess.read()
  const rule = (settings.itemRules ?? []).find((r) => r.id === id)
  if (rule === undefined) {
    throw dataError(`no item rule found with id '${id}'`)
  }
  assertWriteAllowed(rule, force)

  const unlocked = force ? transforms.lockItemRule(settings, id, false) : settings
  const next = transforms.removeItemRule(unlocked, id)
  await settingsAccess.write(next)

  process.stdout.write(`${emitJson(rule)}\n`)
}
