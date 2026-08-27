
export const summary = "Duplicate an item rule by id (clone is unlocked + inactive)"

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
      description: "Item-rule id (uuid string assigned at creation) of the rule to duplicate",
      required: true,
    },
  ],
  exits: [{ code: 2, meaning: "no item rule with that id" }],
  examples: ["ops temper inventory item-rule duplicate 6cdb..."],
}

interface RuleTransforms {
  readonly duplicateItemRule: (settings: RuleSettings, id: string) => RuleSettings
}

export default async function temperInventoryItemRuleDuplicate(
  args: readonly string[]
): Promise<void> {
  const parsed = parseArgs(help, args)
  const id = parsed.positionals[0]
  if (id === undefined) throw inputError("item-rule id is required")

  const [settingsAccess, transforms] = await Promise.all([
    inventorySettings(),
    codeModule<RuleTransforms>(RULE_SETTINGS),
  ])
  const settings = await settingsAccess.read()
  const sourceIndex = (settings.itemRules ?? []).findIndex((r) => r.id === id)
  if (sourceIndex === -1) {
    throw dataError(`no item rule found with id '${id}'`)
  }

  const next = transforms.duplicateItemRule(settings, id)
  const clone = (next.itemRules ?? [])[sourceIndex + 1]
  if (clone === undefined) {
    throw new Error("duplicateItemRule did not insert a clone — settings shape is corrupt")
  }
  await settingsAccess.write(next)

  process.stdout.write(`${emitJson(clone)}\n`)
}
