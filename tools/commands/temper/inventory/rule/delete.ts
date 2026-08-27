
export const summary = "Remove a category rule (--force unlocks-then-removes for locked rules)"

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

interface RuleTransforms {
  readonly lockCategoryRule: (settings: RuleSettings, id: string, locked: boolean) => RuleSettings
  readonly removeCategoryRule: (settings: RuleSettings, id: string) => RuleSettings
}

export default async function temperInventoryRuleDelete(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const id = parsed.positionals[0]
  if (id === undefined) throw inputError("rule id is required")
  const force = parsed.boolean("--force")

  const [settingsAccess, transforms] = await Promise.all([
    inventorySettings(),
    codeModule<RuleTransforms>(RULE_SETTINGS),
  ])
  const settings = await settingsAccess.read()
  const existing = settings.rules.find((r) => r.id === id)
  if (existing === undefined) {
    throw dataError(`rule with id '${id}' not found in user rules`)
  }
  assertWriteAllowed(existing, force)

  const unlocked =
    existing.locked === true && force ? transforms.lockCategoryRule(settings, id, false) : settings
  const next = transforms.removeCategoryRule(unlocked, id)
  await settingsAccess.write(next)
  process.stdout.write(`${emitJson({ deletedId: id })}\n`)
}
