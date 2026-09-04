import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { addCategoryRule } from "@akasha/temper-items-rules-core/inventory-rule-settings"
import type { CategoryRule } from "@akasha/temper-items-rules-core/inventory-rule-types"
import {
  ACTIVE,
  answering,
  DATA,
  GOAL,
  NOTES,
  readIn,
  refusedAll,
  settingsOf,
  shapeOf,
  TITLE,
  toldOf,
  webIn,
} from "../inventory-rule-calling/inventory-rule-calling.module.code.ts"
import {
  narrowItemAction,
  narrowMoveToDestination,
  narrowStockScope,
  parseConditionsJson,
} from "../inventory-rule-flags/inventory-rule-flags.module.code.ts"

const CALLED_AS = "akasha temper-inventory-rule-create"

const CATEGORY = "--category"

const ACTION = "--action"

const DESTINATION = "--destination"

const CONDITIONS = "--conditions"

const STOCK_SCOPE = "--stock-scope"

const SHAPE = shapeOf(
  [CATEGORY, ACTION, DESTINATION, CONDITIONS, TITLE, NOTES, GOAL, ACTIVE, STOCK_SCOPE],
  { yesNo: [ACTIVE], required: [CATEGORY, ACTION] }
)

async function made(held: ReadonlyMap<string, string>): Promise<Answer> {
  const destination = held.get(DESTINATION)
  const scope = held.get(STOCK_SCOPE)
  const goal = held.get(GOAL)
  const conditions = parseConditionsJson(held.get(CONDITIONS))
  const settingsAccess = await settingsOf()
  const settings = await settingsAccess.read()
  const next = addCategoryRule(settings, {
    categoryId: held.get(CATEGORY) ?? "",
    action: narrowItemAction(held.get(ACTION) ?? "", ACTION),
    ...(destination !== undefined
      ? { destination: narrowMoveToDestination(destination, DESTINATION) }
      : {}),
    ...(conditions !== undefined ? { conditions } : {}),
    ...(scope !== undefined ? { stockScope: narrowStockScope(scope, STOCK_SCOPE) } : {}),
    ...(goal !== undefined ? { goal } : {}),
  })
  const created = next.rules[next.rules.length - 1]
  if (created === undefined) {
    return refused("a category rule was added and none stands at the end of the list", DATA)
  }
  const merged: CategoryRule = { ...created, ...webIn(held) }
  await settingsAccess.write({
    ...next,
    rules: next.rules.map((one) => (one.id === created.id ? merged : one)),
  })
  return toldOf(merged)
}

export async function temperInventoryRuleCreate(argv: readonly string[] = []): Promise<Answer> {
  const read = readIn(argv, CALLED_AS, SHAPE)
  if ("refused" in read) return refusedAll(read.refused)
  return await answering(() => made(read.said))
}
