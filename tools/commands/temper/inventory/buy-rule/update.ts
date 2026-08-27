export const summary = "Update fields on a buy rule by id (--target / --source / --title / --notes / --goal / --active, --force to override the lock guard)"

import type { CommandHelp } from "../../../../ops/surface.ts"
import { codeModule } from "../../../../lib/code-import.ts"
import { dataError, inputError } from "../../../../lib/exit.ts"
import { parseArgs } from "../../../../lib/parse-args.ts"
import { emitJson } from "../../../../lib/format-output.ts"
import { BUY_SOURCE_CHOICES, ruleFlags } from "../../../../lib/temper-rule-flags.ts"
import {
  assertWriteAllowed,
  inventorySettings,
  type RuleSettings,
} from "../../../../lib/temper-inventory.ts"

const BUY_RULE_SETTINGS = "@temper/game-items-rules-core/buy-rule-settings"

export const help: CommandHelp = {
  positionals: [
    {
      name: "<id>",
      description: "Buy-rule id (uuid string assigned at creation)",
      required: true,
    },
  ],
  flags: [
    {
      name: "--target",
      argLabel: "<n>",
      valueShape: "token",
      description: "Global target quantity — buy the shortfall up to this total",
    },
    {
      name: "--source",
      argLabel: "<name>",
      valueShape: "token",
      description: "Acquisition source for the buy step",
      choices: BUY_SOURCE_CHOICES,
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
      description: "Activate / deactivate the rule",
      choices: ["true", "false"],
    },
    {
      name: "--force",
      description: "Override the locked-rule guard for this update",
    },
  ],
  exits: [{ code: 2, meaning: "no buy rule with that id" }],
  examples: [
    "ops temper inventory buy-rule update 6cdb... --target 5000",
    "ops temper inventory buy-rule update 6cdb... --active true",
  ],
}

interface BuyRuleTransforms {
  readonly bulkUpdateBuyRules: (
    settings: RuleSettings,
    ids: readonly string[],
    patch: Readonly<Record<string, unknown>>,
    opts: { readonly force: boolean }
  ) => RuleSettings
}

async function parseSource(value: string | undefined): Promise<string | undefined> {
  if (value === undefined) return undefined
  const match = BUY_SOURCE_CHOICES.find((s) => s === value)
  if (match === undefined) throw inputError(`--source: invalid value '${value}'`)
  return match
}

export default async function temperInventoryBuyRuleUpdate(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const flags = await ruleFlags()
  const id = parsed.positionals[0]
  if (id == null) throw inputError("buy-rule id is required")
  const force = parsed.boolean("--force")

  const targetQuantity = parsed.nonNegativeInt("--target")
  const source = await parseSource(parsed.string("--source"))
  const title = parsed.string("--title")
  const notes = parsed.string("--notes")
  const goal = parsed.string("--goal")
  const active = flags.parseBooleanFlag(parsed.string("--active"), "--active")

  const patch: Record<string, unknown> = {}
  if (targetQuantity !== undefined) patch.targetQuantity = targetQuantity
  if (source !== undefined) patch.source = source
  if (title !== undefined) patch.title = title
  if (notes !== undefined) patch.notes = notes
  if (goal !== undefined) patch.goal = goal
  if (active !== undefined) patch.active = active

  if (Object.keys(patch).length === 0) {
    throw inputError(
      "no update fields supplied — pass at least one of --target / --source / --title / --notes / --goal / --active"
    )
  }

  const [settingsAccess, transforms] = await Promise.all([
    inventorySettings(),
    codeModule<BuyRuleTransforms>(BUY_RULE_SETTINGS),
  ])
  const settings = await settingsAccess.read()
  const rule = (settings.buyRules ?? []).find((r) => r.id === id)
  if (rule === undefined) {
    throw dataError(`no buy rule found with id '${id}'`)
  }
  assertWriteAllowed(rule, force)

  const next = transforms.bulkUpdateBuyRules(settings, [id], patch, { force })
  await settingsAccess.write(next)

  const updated = (next.buyRules ?? []).find((r) => r.id === id)
  process.stdout.write(`${emitJson(updated ?? rule)}\n`)
}
