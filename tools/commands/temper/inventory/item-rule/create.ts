export const summary =
  "Create a new per-item rule (--item-id, --item-name required; optional --action / --destination / --title / --notes / --goal / --active / --stock-quantity)"

import { narrowDestination } from "@temper/game-items-rules-core/inventory-destination-parse"
import {
  addItemRule,
  bulkUpdateItemRules,
} from "@temper/game-items-rules-core/inventory-rule-settings"
import type {
  ItemRule,
  MoveToDestination,
} from "@temper/game-items-rules-core/inventory-rule-types"
import { inputError } from "../../../../lib/exit.ts"
import { emitJson } from "../../../../lib/format-output.ts"
import { parseArgs } from "../../../../lib/parse-args.ts"
import {
  narrowItemAction,
  parseBooleanFlag,
} from "../../../../lib/temper-inventory/rule-flags-shared.ts"
import { inventorySettings } from "../../../../lib/temper-inventory.ts"
import { ITEM_ACTION_CHOICES } from "../../../../lib/temper-rule-flags.ts"
import type { CommandHelp } from "../../../../ops/surface.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--item-id",
      argLabel: "<n>",
      valueShape: "token",
      required: true,
      description: "ESO item id (GetItemId)",
    },
    {
      name: "--item-name",
      argLabel: "<s>",
      valueShape: "token",
      required: true,
      description: "Display name (authoritative key remains itemId)",
    },
    {
      name: "--action",
      argLabel: "<name>",
      valueShape: "token",
      description: "ItemAction to take when the rule fires",
      choices: ITEM_ACTION_CHOICES,
      default: "nothing",
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
      description: "Activate the rule (undefined treated as true for backward compat)",
      choices: ["true", "false"],
    },
    {
      name: "--stock-quantity",
      argLabel: "<n>",
      valueShape: "token",
      description: "stock action only — move until destination has this many",
    },
    {
      name: "--stock-scope",
      argLabel: "<scope>",
      valueShape: "token",
      description: "stock action only — `current-character` (bank target) or `any-character`",
      choices: ["current-character", "any-character"],
    },
  ],
  examples: [
    "ops temper inventory item-rule create --item-id 16424 --item-name 'Argonian Blood Wine' --action sell",
    "ops temper inventory item-rule create --item-id 79690 --item-name 'Crown Repair Kit' --action move-to --destination craft-bag",
  ],
}

function parseDestination(value: string | undefined): MoveToDestination | undefined {
  if (value === undefined) return undefined
  if (value.length === 0) throw inputError("--destination: must not be empty")
  const dest = narrowDestination(value)
  if (dest === undefined) throw inputError(`--destination: unrecognized value '${value}'`)
  return dest
}

function parseStockScope(value: string | undefined): string | undefined {
  if (value === undefined) return undefined
  if (value === "current-character") return "current-character"
  if (value === "any-character") return "any-character"
  throw inputError(`--stock-scope: invalid value '${value}'`)
}

export default async function temperInventoryItemRuleCreate(
  args: readonly string[]
): Promise<void> {
  const parsed = parseArgs(help, args)
  const itemId = parsed.requireNonNegativeInt("--item-id")
  const itemName = parsed.requireString("--item-name")
  const action = narrowItemAction(parsed.string("--action") ?? "nothing", "--action")
  const destination = parseDestination(parsed.string("--destination"))
  const title = parsed.string("--title")
  const notes = parsed.string("--notes")
  const goal = parsed.string("--goal")
  const active = parseBooleanFlag(parsed.string("--active"), "--active")
  const stockQuantity = parsed.nonNegativeInt("--stock-quantity")
  const stockScope = parseStockScope(parsed.string("--stock-scope"))

  if (stockScope !== undefined) {
    throw inputError(
      "--stock-scope is not yet supported by bulkUpdateItemRules; extend the helper Pick first."
    )
  }

  const settingsAccess = await inventorySettings()
  const settings = await settingsAccess.read()

  const afterAdd = addItemRule(settings, { itemId, itemName, action })
  const newRule = (afterAdd.itemRules ?? [])[0]
  if (newRule === undefined) {
    throw new Error("addItemRule did not insert a new rule — settings shape is corrupt")
  }
  const newId = newRule.id

  const patch: Partial<
    Pick<
      ItemRule,
      "action" | "destination" | "active" | "goal" | "title" | "notes" | "stockQuantity"
    >
  > = {}
  if (destination !== undefined) patch.destination = destination
  if (title !== undefined) patch.title = title
  if (notes !== undefined) patch.notes = notes
  if (goal !== undefined) patch.goal = goal
  if (active !== undefined) patch.active = active
  if (stockQuantity !== undefined) patch.stockQuantity = stockQuantity

  const next =
    Object.keys(patch).length > 0 ? bulkUpdateItemRules(afterAdd, [newId], patch) : afterAdd

  await settingsAccess.write(next)

  const created = (next.itemRules ?? []).find((r) => r.id === newId)
  process.stdout.write(`${emitJson(created ?? newRule)}\n`)
}
