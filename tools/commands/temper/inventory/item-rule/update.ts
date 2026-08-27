export const summary = "Update fields on an item rule by id (--action / --destination / --title / --notes / --goal / --active / --stock-quantity, --force to override the lock guard)"

import type { CommandHelp } from "../../../../ops/surface.ts"
import { codeModule } from "../../../../lib/code-import.ts"
import { dataError, inputError } from "../../../../lib/exit.ts"
import { parseArgs } from "../../../../lib/parse-args.ts"
import { emitJson } from "../../../../lib/format-output.ts"
import {
  ITEM_ACTION_CHOICES,
  destinationParse,
  ruleFlags,
} from "../../../../lib/temper-rule-flags.ts"
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
      name: "--action",
      argLabel: "<name>",
      valueShape: "token",
      description: "ItemAction to take when the rule fires",
      choices: ITEM_ACTION_CHOICES,
    },
    {
      name: "--destination",
      argLabel: "<d>",
      valueShape: "token",
      description: "MoveToDestination for move-to / character-equip / companion-equip / stock",
    },
    {
      name: "--title",
      argLabel: "<s>",
      valueShape: "prose",
      description: "Web-only display title (never sent to addon)",
    },
    {
      name: "--notes",
      argLabel: "<s>",
      valueShape: "prose",
      description: "Web-only freeform notes (never sent to addon)",
    },
    {
      name: "--goal",
      argLabel: "<s>",
      valueShape: "prose",
      description: "Web-only goal label (never sent to addon)",
    },
    {
      name: "--active",
      argLabel: "<true|false>",
      valueShape: "token",
      description: "Activate / deactivate (undefined treated as true for backward compat)",
      choices: ["true", "false"],
    },
    {
      name: "--stock-quantity",
      argLabel: "<n>",
      valueShape: "token",
      description: "stock action only — move until destination has this many",
    },
    {
      name: "--force",
      description: "Override the locked-rule guard for this update",
    },
  ],
  exits: [{ code: 2, meaning: "no item rule with that id" }],
  examples: [
    "ops temper inventory item-rule update 6cdb... --action sell",
    "ops temper inventory item-rule update 6cdb... --destination craft-bag --active true",
  ],
}

interface ItemRuleTransforms {
  readonly bulkUpdateItemRules: (
    settings: RuleSettings,
    ids: readonly string[],
    patch: Readonly<Record<string, unknown>>,
    opts: { readonly force: boolean }
  ) => RuleSettings
}

async function parseDestination(value: string | undefined): Promise<string | undefined> {
  if (value === undefined) return undefined
  if (value.length === 0) throw inputError("--destination: must not be empty")
  const dest = (await destinationParse()).narrowDestination(value)
  if (dest === undefined) throw inputError(`--destination: unrecognized value '${value}'`)
  return dest
}

export default async function temperInventoryItemRuleUpdate(
  args: readonly string[]
): Promise<void> {
  const parsed = parseArgs(help, args)
  const flags = await ruleFlags()
  const id = parsed.positionals[0]
  if (id == null) throw inputError("item-rule id is required")
  const force = parsed.boolean("--force")

  const actionRaw = parsed.string("--action")
  const action = actionRaw === undefined ? undefined : flags.narrowItemAction(actionRaw, "--action")
  const destination = await parseDestination(parsed.string("--destination"))
  const title = parsed.string("--title")
  const notes = parsed.string("--notes")
  const goal = parsed.string("--goal")
  const active = flags.parseBooleanFlag(parsed.string("--active"), "--active")
  const stockQuantity = parsed.nonNegativeInt("--stock-quantity")

  const patch: Record<string, unknown> = {}
  if (action !== undefined) patch.action = action
  if (destination !== undefined) patch.destination = destination
  if (title !== undefined) patch.title = title
  if (notes !== undefined) patch.notes = notes
  if (goal !== undefined) patch.goal = goal
  if (active !== undefined) patch.active = active
  if (stockQuantity !== undefined) patch.stockQuantity = stockQuantity

  if (Object.keys(patch).length === 0) {
    throw inputError(
      "no update fields supplied — pass at least one of --action / --destination / --title / --notes / --goal / --active / --stock-quantity"
    )
  }

  const [settingsAccess, transforms] = await Promise.all([
    inventorySettings(),
    codeModule<ItemRuleTransforms>(RULE_SETTINGS),
  ])
  const settings = await settingsAccess.read()
  const rule = (settings.itemRules ?? []).find((r) => r.id === id)
  if (rule === undefined) {
    throw dataError(`no item rule found with id '${id}'`)
  }
  assertWriteAllowed(rule, force)

  const next = transforms.bulkUpdateItemRules(settings, [id], patch, { force })
  await settingsAccess.write(next)

  const updated = (next.itemRules ?? []).find((r) => r.id === id)
  process.stdout.write(`${emitJson(updated ?? rule)}\n`)
}
