export const summary = "Create a new buy rule (--item-id, --item-name, --target required; optional --source / --title / --notes / --goal / --active). New rules default inactive."

import type { CommandHelp } from "../../../../ops/surface.ts"
import { codeModule } from "../../../../lib/code-import.ts"
import { inputError } from "../../../../lib/exit.ts"
import { parseArgs } from "../../../../lib/parse-args.ts"
import { emitJson } from "../../../../lib/format-output.ts"
import { BUY_SOURCE_CHOICES, ruleFlags } from "../../../../lib/temper-rule-flags.ts"
import { inventorySettings, type RuleSettings } from "../../../../lib/temper-inventory.ts"

const BUY_RULE_SETTINGS = "@temper/game-items-rules-core/buy-rule-settings"

export const help: CommandHelp = {
  flags: [
    {
      name: "--item-id",
      argLabel: "<n>",
      valueShape: "token",
      required: true,
      description:
        "ESO item id (GetItemId) — the authoritative match key. A wrong id matches " +
        "no store entry (silent no-op); confirm via `lookup-item <link>` first.",
    },
    {
      name: "--item-name",
      argLabel: "<s>",
      valueShape: "token",
      required: true,
      description: "Display name (authoritative key remains itemId)",
    },
    {
      name: "--target",
      argLabel: "<n>",
      valueShape: "token",
      required: true,
      description: "Global target quantity — buy the shortfall up to this total",
    },
    {
      name: "--source",
      argLabel: "<name>",
      valueShape: "token",
      description: "Acquisition source for the buy step",
      choices: BUY_SOURCE_CHOICES,
      default: "merchant",
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
      description: "Activate the rule (new rules default inactive)",
      choices: ["true", "false"],
    },
  ],
  examples: [
    "ops temper inventory buy-rule create --item-id 30357 --item-name Lockpick --target 4000",
    "ops temper inventory buy-rule create --item-id 30357 --item-name Lockpick --target 4000 --active true",
  ],
}

interface BuyRuleTransforms {
  readonly addBuyRule: (
    settings: RuleSettings,
    draft: {
      readonly itemId: number
      readonly itemName: string
      readonly targetQuantity: number
      readonly source: string
    }
  ) => RuleSettings
  readonly bulkUpdateBuyRules: (
    settings: RuleSettings,
    ids: readonly string[],
    patch: Readonly<Record<string, unknown>>
  ) => RuleSettings
}

async function parseSource(value: string): Promise<string> {
  const match = BUY_SOURCE_CHOICES.find((s) => s === value)
  if (match === undefined) throw inputError(`--source: invalid value '${value}'`)
  return match
}

export default async function temperInventoryBuyRuleCreate(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const flags = await ruleFlags()
  const itemId = parsed.requireNonNegativeInt("--item-id")
  const itemName = parsed.requireString("--item-name")
  const targetQuantity = parsed.requireNonNegativeInt("--target")
  const source = await parseSource(parsed.string("--source") ?? "merchant")
  const title = parsed.string("--title")
  const notes = parsed.string("--notes")
  const goal = parsed.string("--goal")
  const active = flags.parseBooleanFlag(parsed.string("--active"), "--active")

  const [settingsAccess, transforms] = await Promise.all([
    inventorySettings(),
    codeModule<BuyRuleTransforms>(BUY_RULE_SETTINGS),
  ])
  const settings = await settingsAccess.read()

  const afterAdd = transforms.addBuyRule(settings, { itemId, itemName, targetQuantity, source })
  const newRule = (afterAdd.buyRules ?? [])[0]
  if (newRule === undefined) {
    throw new Error("addBuyRule did not insert a new rule — settings shape is corrupt")
  }
  const newId = newRule.id

  const patch: Record<string, unknown> = {}
  if (title !== undefined) patch.title = title
  if (notes !== undefined) patch.notes = notes
  if (goal !== undefined) patch.goal = goal
  if (active !== undefined) patch.active = active

  const next =
    Object.keys(patch).length > 0 ? transforms.bulkUpdateBuyRules(afterAdd, [newId], patch) : afterAdd

  await settingsAccess.write(next)

  const created = (next.buyRules ?? []).find((r) => r.id === newId)
  process.stdout.write(`${emitJson(created ?? newRule)}\n`)
  if (active !== true) {
    process.stderr.write(
      `buy rule ${newId} created INACTIVE — run 'buy-rule update ${newId} --active true' to activate.\n`
    )
  }
}
