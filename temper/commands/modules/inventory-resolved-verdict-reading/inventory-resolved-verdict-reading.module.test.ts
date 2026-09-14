import { expect, test } from "bun:test"
import {
  differingBetween,
  type FreshInputs,
  freshVerdictFor,
  itemRuleDestination,
  queuedVerdictsIn,
  type Verdict,
  verdictRecordedOn,
  verdictSaid,
} from "akasha/temper/commands/modules/inventory-resolved-verdict-reading/inventory-resolved-verdict-reading.module.code.ts"
import type { InventoryItemData } from "akasha/temper/items-core/modules/inventory-types/inventory-types.module.code.ts"
import type { CompiledOrderedRule } from "akasha/temper/items-rules-core/modules/inventory-rule-compiler-types/inventory-rule-compiler-types.module.code.ts"
import type { ItemRule } from "akasha/temper/items-rules-core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import type { ItemFacts } from "akasha/temper/items-rules-eval/modules/item-facts/item-facts.module.code.ts"
import { buildWebEvalEnv } from "akasha/temper/items-rules-matcher/modules/web-eval-env/web-eval-env.module.code.ts"

const LOCKPICK = 30357

const FACTS: ItemFacts = {
  itemId: LOCKPICK,
  itemName: "Lockpick",
  itemLink: "",
  categoryNodeIds: ["all"],
}

const SELL_ALL: CompiledOrderedRule = { categoryId: "all", action: "sell" }

const STOCK_BY_PRIORITY: ItemRule = {
  id: "item:30357",
  itemId: LOCKPICK,
  itemName: "",
  action: "stock",
  destination: "character:by-priority",
}

function itemOf(over: Partial<InventoryItemData>): InventoryItemData {
  return {
    itemId: LOCKPICK,
    itemName: "Lockpick",
    itemLink: "",
    quality: 1,
    filterType: 1,
    itemType: 1,
    traitType: 0,
    requiredLevel: 1,
    requiredCP: 0,
    stackCount: 1,
    ...over,
  }
}

function inputsOf(
  orderedRules: readonly CompiledOrderedRule[],
  itemRules: readonly ItemRule[],
  queued: readonly (readonly [number, string])[]
): FreshInputs {
  return {
    orderedRules,
    itemRuleById: new Map(itemRules.map((one) => [one.itemId, one])),
    queuedById: new Map(queued),
    ctx: { env: buildWebEvalEnv(undefined) },
  }
}

function verdictOf(over: Partial<Verdict>): Verdict {
  return { action: "nothing", destination: null, by: "ordered-rule", ruleIndex: 3, ...over }
}

test("a stack the addon never resolved carries no verdict to compare", () => {
  expect(verdictRecordedOn(itemOf({}))).toBeUndefined()
})

test("the four fields the addon wrote are read back as one verdict", () => {
  const recorded = verdictRecordedOn(
    itemOf({
      resolvedAction: "stock",
      resolvedDestination: "bank",
      resolvedBy: "ordered-rule",
      resolvedRuleIndex: 29,
    })
  )
  expect(recorded).toEqual({
    action: "stock",
    destination: "bank",
    by: "ordered-rule",
    ruleIndex: 29,
  })
})

test("a verdict is said as its action, its place and the route that reached it", () => {
  expect(verdictSaid(verdictOf({ action: "stock", destination: "bank", ruleIndex: 29 }))).toBe(
    "stock to bank  (ordered-rule 29)"
  )
  expect(verdictSaid(verdictOf({ by: "no-match", ruleIndex: null }))).toBe("nothing  (no-match)")
})

test("a record naming an action the fresh reading does not reach names the action", () => {
  expect(differingBetween(verdictOf({ action: "stock" }), verdictOf({ action: "sell" }))).toEqual([
    "action",
  ])
})

test("a record naming a place the fresh reading does not reach names the destination", () => {
  expect(
    differingBetween(verdictOf({ destination: "bank" }), verdictOf({ destination: "craft-bag" }))
  ).toEqual(["destination"])
})

test("two ordered rules disagreeing over which one took the item name the rule", () => {
  expect(differingBetween(verdictOf({ ruleIndex: 29 }), verdictOf({ ruleIndex: 30 }))).toEqual([
    "rule",
  ])
})

test("a rule index goes uncompared where one side names no ordered rule", () => {
  expect(
    differingBetween(
      verdictOf({ by: "item-rule", ruleIndex: null }),
      verdictOf({ by: "ordered-rule", ruleIndex: 7 })
    )
  ).toEqual([])
})

test("a locked item no unlock rule reaches is resolved to nothing", () => {
  expect(freshVerdictFor(itemOf({ locked: true }), FACTS, inputsOf([SELL_ALL], [], []))).toEqual({
    action: "nothing",
    destination: null,
    by: "no-match",
    ruleIndex: null,
  })
})

test("a locked item an unlock rule reaches names that rule", () => {
  const rule: CompiledOrderedRule = { categoryId: "all", action: "unlock", locked: "locked" }
  const locked: ItemFacts = { ...FACTS, isLocked: true }
  expect(freshVerdictFor(itemOf({ locked: true }), locked, inputsOf([rule], [], []))).toEqual({
    action: "unlock",
    destination: null,
    by: "ordered-rule",
    ruleIndex: 0,
  })
})

test("a queued verdict decides an unlocked item before any rule does", () => {
  expect(
    freshVerdictFor(itemOf({}), FACTS, inputsOf([SELL_ALL], [], [[LOCKPICK, "nothing"]]))
  ).toEqual({
    action: "nothing",
    destination: null,
    by: "item-verdict-outbox",
    ruleIndex: null,
  })
})

test("an item rule decides an unlocked item before an ordered rule does", () => {
  expect(freshVerdictFor(itemOf({}), FACTS, inputsOf([SELL_ALL], [STOCK_BY_PRIORITY], []))).toEqual(
    {
      action: "stock",
      destination: "bank",
      by: "item-rule",
      ruleIndex: null,
    }
  )
})

test("an item rule stocking by priority sends its surplus where the addon sends it", () => {
  expect(itemRuleDestination(STOCK_BY_PRIORITY)).toBe("bank")
})

test("an ordered rule that matches names itself and the place it sends the item", () => {
  const rules: readonly CompiledOrderedRule[] = [
    { categoryId: "weapons", action: "sell" },
    { categoryId: "all", action: "move-to", destination: "bank" },
  ]
  expect(freshVerdictFor(itemOf({}), FACTS, inputsOf(rules, [], []))).toEqual({
    action: "move-to",
    destination: "bank",
    by: "ordered-rule",
    ruleIndex: 1,
  })
})

test("a queued verdict is read out of the saved variables the capture sits in", () => {
  const content = [
    "TemperInventory_SavedVariables =",
    "{",
    '    ["Default"] =',
    "    {",
    '        ["@Alanarre"] =',
    "        {",
    '            ["$AccountWide"] =',
    "            {",
    '                ["pendingSettingsMutations"] =',
    "                {",
    "                    [1] =",
    "                    {",
    '                        ["kind"] = "item-rule-verdict",',
    '                        ["itemId"] = 30357,',
    '                        ["itemName"] = "Lockpick",',
    '                        ["action"] = "sell",',
    "                    },",
    "                },",
    "            },",
    "        },",
    "    },",
    "}",
  ].join("\n")
  expect([...queuedVerdictsIn(content)]).toEqual([[LOCKPICK, "sell"]])
})

test("a capture queueing nothing answers with no verdict at all", () => {
  const content = 'TemperInventory_SavedVariables =\n{\n    ["Default"] =\n    {\n    },\n}'
  expect(queuedVerdictsIn(content).size).toBe(0)
})
