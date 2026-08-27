export const summary = "Append a new category rule (addCategoryRule)"

import type { CommandHelp } from "../../../../ops/surface.ts"
import { codeModule } from "../../../../lib/code-import.ts"
import { parseArgs } from "../../../../lib/parse-args.ts"
import { emitJson } from "../../../../lib/format-output.ts"
import {
  ITEM_ACTION_CHOICES,
  STOCK_SCOPE_CHOICES,
  ruleFlags,
  type Conditions,
} from "../../../../lib/temper-rule-flags.ts"
import { inventorySettings, type Rule, type RuleSettings } from "../../../../lib/temper-inventory.ts"

const RULE_SETTINGS = "@temper/game-items-rules-core/inventory-rule-settings"

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

interface RuleTransforms {
  readonly addCategoryRule: (
    settings: RuleSettings,
    draft: {
      readonly categoryId: string
      readonly action: string
      readonly destination: string | undefined
      readonly conditions: Conditions | undefined
      readonly stockScope: string | undefined
      readonly goal: string | undefined
    }
  ) => RuleSettings
}

export default async function temperInventoryRuleCreate(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const flags = await ruleFlags()
  const categoryId = parsed.requireString("--category")
  const action = flags.narrowItemAction(parsed.requireString("--action"), "--action")
  const destinationRaw = parsed.string("--destination")
  const destination =
    destinationRaw === undefined
      ? undefined
      : flags.narrowMoveToDestination(destinationRaw, "--destination")
  const conditions = flags.parseConditionsJson(parsed.string("--conditions"))
  const title = parsed.string("--title")
  const notes = parsed.string("--notes")
  const goal = parsed.string("--goal")
  const stockScopeRaw = parsed.string("--stock-scope")
  const stockScope =
    stockScopeRaw === undefined ? undefined : flags.narrowStockScope(stockScopeRaw, "--stock-scope")
  const active = flags.parseBooleanFlag(parsed.string("--active"), "--active")

  const [settingsAccess, transforms] = await Promise.all([
    inventorySettings(),
    codeModule<RuleTransforms>(RULE_SETTINGS),
  ])
  const settings = await settingsAccess.read()
  const next = transforms.addCategoryRule(settings, {
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
  const merged: Rule = {
    ...created,
    ...(active !== undefined ? { active } : {}),
    ...(title !== undefined ? { title } : {}),
    ...(notes !== undefined ? { notes } : {}),
  }
  const mergedSettings: RuleSettings = {
    ...next,
    rules: next.rules.map((r) => (r.id === created.id ? merged : r)),
  }
  await settingsAccess.write(mergedSettings)
  process.stdout.write(`${emitJson(merged)}\n`)
}
