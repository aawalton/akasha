export const summary = "Append a new category rule (addCategoryRule)"

import { addCategoryRule } from "@akasha/temper-items-rules-core/inventory-rule-settings"
import type { CategoryRule } from "@akasha/temper-items-rules-core/inventory-rule-types"
import { emitJson } from "../../../../lib/format-output.ts"
import { parseArgs } from "../../../../lib/parse-args.ts"
import {
  narrowItemAction,
  narrowMoveToDestination,
  narrowStockScope,
  parseBooleanFlag,
  parseConditionsJson,
} from "../../../../lib/temper-inventory/rule-flags-shared.ts"
import { type InventoryRuleSettings, inventorySettings } from "../../../../lib/temper-inventory.ts"
import { ITEM_ACTION_CHOICES, STOCK_SCOPE_CHOICES } from "../../../../lib/temper-rule-flags.ts"
import type { CommandHelp } from "../../../../ops/surface.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--category",
      argLabel: "<id>",
      valueShape: "token",
      required: true,
      description: "Category id (e.g. `equipment`, `food`, `all`)",
    },
    {
      name: "--action",
      argLabel: "<name>",
      valueShape: "token",
      required: true,
      choices: ITEM_ACTION_CHOICES,
      description: "Item action — one of the ItemAction enum members",
    },
    {
      name: "--destination",
      argLabel: "<destination>",
      valueShape: "token",
      description: "MoveToDestination (e.g. `bank`, `craft-bag`, `character:abc-1234`)",
    },
    {
      name: "--conditions",
      argLabel: "<json>",
      valueShape: "token",
      description:
        "JSON object for the rule's `conditions` field (Zod-validated against the CategoryRule['conditions'] shape)",
    },
    {
      name: "--title",
      argLabel: "<text>",
      valueShape: "prose",
      description: "Web-only title (never sent to addon)",
    },
    {
      name: "--notes",
      argLabel: "<text>",
      valueShape: "prose",
      description: "Web-only notes (never sent to addon)",
    },
    {
      name: "--goal",
      argLabel: "<text>",
      valueShape: "prose",
      description: "Web-only goal label (never sent to addon)",
    },
    {
      name: "--active",
      argLabel: "<true|false>",
      valueShape: "token",
      choices: ["true", "false"],
      description: "Whether the rule is active (default false — addCategoryRule's default)",
    },
    {
      name: "--stock-scope",
      argLabel: "<scope>",
      valueShape: "token",
      choices: STOCK_SCOPE_CHOICES,
      description: "stock-action only: `current-character` or `any-character`",
    },
  ],
  examples: [
    "ops temper inventory rule create --category food --action stock --stock-scope any-character",
    "ops temper inventory rule create --category equipment --action sell --conditions '{\"maxQuality\":2}'",
  ],
}

export default async function temperInventoryRuleCreate(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const categoryId = parsed.requireString("--category")
  const action = narrowItemAction(parsed.requireString("--action"), "--action")
  const destinationRaw = parsed.string("--destination")
  const destination =
    destinationRaw === undefined
      ? undefined
      : narrowMoveToDestination(destinationRaw, "--destination")
  const conditions = parseConditionsJson(parsed.string("--conditions"))
  const title = parsed.string("--title")
  const notes = parsed.string("--notes")
  const goal = parsed.string("--goal")
  const stockScopeRaw = parsed.string("--stock-scope")
  const stockScope =
    stockScopeRaw === undefined ? undefined : narrowStockScope(stockScopeRaw, "--stock-scope")
  const active = parseBooleanFlag(parsed.string("--active"), "--active")

  const settingsAccess = await inventorySettings()
  const settings = await settingsAccess.read()
  const next = addCategoryRule(settings, {
    categoryId,
    action,
    destination,
    conditions,
    stockScope,
    goal,
  })
  const created = next.rules[next.rules.length - 1]
  if (created === undefined) {
    throw new Error("ruleCreate: addCategoryRule produced no new rule (impossible by construction)")
  }
  const merged: CategoryRule = {
    ...created,
    ...(active !== undefined ? { active } : {}),
    ...(title !== undefined ? { title } : {}),
    ...(notes !== undefined ? { notes } : {}),
  }
  const mergedSettings: InventoryRuleSettings = {
    ...next,
    rules: next.rules.map((r) => (r.id === created.id ? merged : r)),
  }
  await settingsAccess.write(mergedSettings)
  process.stdout.write(`${emitJson(merged)}\n`)
}
