export const summary =
  "Update fields on a buy rule by id (--target / --source / --title / --notes / --goal / --active, --force to override the lock guard)"

import { bulkUpdateBuyRules } from "@akasha/temper-items-rules-core/buy-rule-settings"
import type { BuyRule, BuySource } from "@akasha/temper-items-rules-core/buy-rule-types"
import { dataError, inputError } from "../../../../lib/exit.ts"
import { emitJson } from "../../../../lib/format-output.ts"
import { parseArgs } from "../../../../lib/parse-args.ts"
import { parseBooleanFlag } from "../../../../lib/temper-inventory/rule-flags-shared.ts"
import { assertWriteAllowed, inventorySettings } from "../../../../lib/temper-inventory.ts"
import { BUY_SOURCE_CHOICES } from "../../../../lib/temper-rule-flags.ts"
import type { CommandHelp } from "../../../../ops/surface.ts"

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

function parseSource(value: string | undefined): BuySource | undefined {
  if (value === undefined) return undefined
  const match = BUY_SOURCE_CHOICES.find((s) => s === value)
  if (match === undefined) throw inputError(`--source: invalid value '${value}'`)
  return match
}

export default async function temperInventoryBuyRuleUpdate(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const id = parsed.positionals[0]
  if (id == null) throw inputError("buy-rule id is required")
  const force = parsed.boolean("--force")

  const targetQuantity = parsed.nonNegativeInt("--target")
  const source = parseSource(parsed.string("--source"))
  const title = parsed.string("--title")
  const notes = parsed.string("--notes")
  const goal = parsed.string("--goal")
  const active = parseBooleanFlag(parsed.string("--active"), "--active")

  const patch: Partial<
    Pick<BuyRule, "targetQuantity" | "source" | "active" | "goal" | "title" | "notes">
  > = {}
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

  const settingsAccess = await inventorySettings()
  const settings = await settingsAccess.read()
  const rule = (settings.buyRules ?? []).find((r) => r.id === id)
  if (rule === undefined) {
    throw dataError(`no buy rule found with id '${id}'`)
  }
  assertWriteAllowed(rule, force)

  const next = bulkUpdateBuyRules(settings, [id], patch, { force })
  await settingsAccess.write(next)

  const updated = (next.buyRules ?? []).find((r) => r.id === id)
  process.stdout.write(`${emitJson(updated ?? rule)}\n`)
}
