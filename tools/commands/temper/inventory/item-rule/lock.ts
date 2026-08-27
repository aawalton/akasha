
export const summary = "Set `locked: true` on an item rule by id (idempotent)"

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
      description: "Item-rule id (uuid string assigned at creation)",
      required: true,
    },
  ],
  exits: [{ code: 2, meaning: "no item rule with that id" }],
  examples: ["ops temper inventory item-rule lock 6cdb..."],
}

interface RuleTransforms {
  readonly lockItemRule: (settings: RuleSettings, id: string, locked: boolean) => RuleSettings
}

export default async function temperInventoryItemRuleLock(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const id = parsed.positionals[0]
  if (id === undefined) throw inputError("item-rule id is required")

  const [settingsAccess, transforms] = await Promise.all([
    inventorySettings(),
    codeModule<RuleTransforms>(RULE_SETTINGS),
  ])
  const settings = await settingsAccess.read()
  const rule = (settings.itemRules ?? []).find((r) => r.id === id)
  if (rule === undefined) {
    throw dataError(`no item rule found with id '${id}'`)
  }

  const next = transforms.lockItemRule(settings, id, true)
  await settingsAccess.write(next)

  const updated = (next.itemRules ?? []).find((r) => r.id === id)
  process.stdout.write(`${emitJson(updated ?? rule)}\n`)
}
