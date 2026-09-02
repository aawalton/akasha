export const summary =
  "Patch fields on a category rule (bulkUpdateCategoryRules with --force for the locked guard)"

import { bulkUpdateCategoryRules } from "@akasha/temper-items-rules-core/inventory-rule-settings"
import type { CategoryRule } from "@akasha/temper-items-rules-core/inventory-rule-types"
import { dataError, inputError } from "../../../../lib/exit.ts"
import { emitJson } from "../../../../lib/format-output.ts"
import { parseArgs } from "../../../../lib/parse-args.ts"
import {
  narrowItemAction,
  narrowMoveToDestination,
  narrowStockScope,
  parseBooleanFlag,
  parseConditionsJson,
  parseDestinationChainJson,
} from "../../../../lib/temper-inventory/rule-flags-shared.ts"
import { assertWriteAllowed, inventorySettings } from "../../../../lib/temper-inventory.ts"
import { ITEM_ACTION_CHOICES, STOCK_SCOPE_CHOICES } from "../../../../lib/temper-rule-flags.ts"
import type { CommandHelp } from "../../../../ops/surface.ts"

export const help: CommandHelp = {
  positionals: [
    {
      name: "<id>",
      description: "Rule id to update",
      required: true,
    },
  ],
  flags: [
    {
      name: "--category",
      argLabel: "<id>",
      valueShape: "token",
      description: "Category id",
    },
    {
      name: "--action",
      argLabel: "<name>",
      valueShape: "token",
      choices: ITEM_ACTION_CHOICES,
      description: "Item action",
    },
    {
      name: "--destination",
      argLabel: "<destination>",
      valueShape: "token",
      description: "MoveToDestination",
    },
    {
      name: "--destination-chain",
      argLabel: "<json>",
      valueShape: "token",
      description:
        "Cascading `Tier[]` JSON (`[{destination,targetQuantity?,charEligibility?}, …]`). " +
        "Sets `destinationChain` and clears the scalar `destination` (unless --destination is " +
        "also given), matching the chain-rule shape the controlled rules use.",
    },
    {
      name: "--conditions",
      argLabel: "<json>",
      valueShape: "token",
      description: "Replacement JSON object for the rule's `conditions`",
    },
    { name: "--title", argLabel: "<text>", valueShape: "prose", description: "Web-only title" },
    { name: "--notes", argLabel: "<text>", valueShape: "prose", description: "Web-only notes" },
    { name: "--goal", argLabel: "<text>", valueShape: "prose", description: "Web-only goal label" },
    {
      name: "--active",
      argLabel: "<true|false>",
      valueShape: "token",
      choices: ["true", "false"],
      description: "Whether the rule is active",
    },
    {
      name: "--stock-scope",
      argLabel: "<scope>",
      valueShape: "token",
      choices: STOCK_SCOPE_CHOICES,
      description: "stock-action scope",
    },
    {
      name: "--force",
      description:
        "Bypass the locked-rule guard (forwards `force: true` to bulkUpdateCategoryRules)",
    },
  ],
  exits: [{ code: 2, meaning: "rule with the given id was not found" }],
  examples: [
    "ops temper inventory rule update 7913abcd --action sell",
    "ops temper inventory rule update 7913abcd --active true --force",
  ],
}

export default async function temperInventoryRuleUpdate(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const id = parsed.positionals[0]
  if (id === undefined) throw inputError("rule id is required")
  const force = parsed.boolean("--force")

  const categoryId = parsed.string("--category")
  const actionRaw = parsed.string("--action")
  const action = actionRaw === undefined ? undefined : narrowItemAction(actionRaw, "--action")
  const destinationRaw = parsed.string("--destination")
  const destination =
    destinationRaw === undefined
      ? undefined
      : narrowMoveToDestination(destinationRaw, "--destination")
  const destinationChain = parseDestinationChainJson(parsed.string("--destination-chain"))
  const conditions = parseConditionsJson(parsed.string("--conditions"))
  const title = parsed.string("--title")
  const notes = parsed.string("--notes")
  const goal = parsed.string("--goal")
  const stockScopeRaw = parsed.string("--stock-scope")
  const stockScope =
    stockScopeRaw === undefined ? undefined : narrowStockScope(stockScopeRaw, "--stock-scope")
  const active = parseBooleanFlag(parsed.string("--active"), "--active")

  const clearScalarDestination = destinationChain !== undefined && destination === undefined

  const patch: Partial<
    Pick<
      CategoryRule,
      | "categoryId"
      | "action"
      | "conditions"
      | "destination"
      | "destinationChain"
      | "stockScope"
      | "active"
      | "goal"
      | "title"
      | "notes"
    >
  > = {
    ...(categoryId !== undefined ? { categoryId } : {}),
    ...(action !== undefined ? { action } : {}),
    ...(destination !== undefined ? { destination } : {}),
    ...(clearScalarDestination ? { destination: undefined } : {}),
    ...(destinationChain !== undefined ? { destinationChain } : {}),
    ...(conditions !== undefined ? { conditions } : {}),
    ...(stockScope !== undefined ? { stockScope } : {}),
    ...(active !== undefined ? { active } : {}),
    ...(goal !== undefined ? { goal } : {}),
    ...(title !== undefined ? { title } : {}),
    ...(notes !== undefined ? { notes } : {}),
  }
  if (Object.keys(patch).length === 0) {
    throw inputError(
      "rule update: no fields to update — pass at least one of --category, --action, --destination, --destination-chain, --conditions, --title, --notes, --goal, --active, --stock-scope"
    )
  }

  const settingsAccess = await inventorySettings()
  const settings = await settingsAccess.read()
  const existing = settings.rules.find((r) => r.id === id)
  if (existing === undefined) {
    throw dataError(`rule with id '${id}' not found in user rules`)
  }
  assertWriteAllowed(existing, force)

  const next = bulkUpdateCategoryRules(settings, [id], patch, { force })
  await settingsAccess.write(next)
  const updated = next.rules.find((r) => r.id === id)
  process.stdout.write(`${emitJson(updated ?? existing)}\n`)
}
