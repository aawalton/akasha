
export const summary = "Set locked:true on a category rule"

import type { CommandHelp } from "../../../../ops/surface.ts"
import { codeModule } from "../../../../lib/code-import.ts"
import { inputError, dataError } from "../../../../lib/exit.ts"
import { parseArgs } from "../../../../lib/parse-args.ts"
import { emitJson } from "../../../../lib/format-output.ts"
import { inventorySettings, type RuleSettings } from "../../../../lib/temper-inventory.ts"

const RULE_SETTINGS = "@temper/game-items-rules-core/inventory-rule-settings"

export const help: CommandHelp = {
  positionals: [
    {
      name: "<id>",
      description: "Rule id to lock",
      required: true,
    },
  ],
  exits: [{ code: 2, meaning: "rule with the given id was not found" }],
  examples: ["ops temper inventory rule lock 7913abcd"],
}

interface RuleTransforms {
  readonly lockCategoryRule: (
    settings: RuleSettings,
    id: string,
    locked: boolean
  ) => RuleSettings
}

export default async function temperInventoryRuleLock(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const id = parsed.positionals[0]
  if (id === undefined) throw inputError("rule id is required")

  const [settingsAccess, transforms] = await Promise.all([
    inventorySettings(),
    codeModule<RuleTransforms>(RULE_SETTINGS),
  ])
  const settings = await settingsAccess.read()
  const existing = settings.rules.find((r) => r.id === id)
  if (existing === undefined) {
    throw dataError(`rule with id '${id}' not found in user rules`)
  }
  const next = transforms.lockCategoryRule(settings, id, true)
  await settingsAccess.write(next)
  process.stdout.write(`${emitJson({ id, locked: true })}\n`)
}
