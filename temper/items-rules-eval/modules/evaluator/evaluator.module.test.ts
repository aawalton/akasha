import { expect, test } from "bun:test"
import type { CompiledOrderedRule } from "akasha/temper/items-rules-core/modules/inventory-rule-compiler-types/inventory-rule-compiler-types.module.code.ts"
import {
  matchRules,
  walkRules,
} from "akasha/temper/items-rules-eval/modules/evaluator/evaluator.module.code.ts"
import type { ItemFacts } from "akasha/temper/items-rules-eval/modules/item-facts/item-facts.module.code.ts"
import { ctxWith } from "akasha/temper/items-rules-eval/test-fixtures/check-container-fixtures/check-container-fixtures.test-fixture.code.ts"

const FACTS: ItemFacts = {
  itemId: 71779,
  itemName: "Counterfeit Pardon Edict",
  itemLink: "|H1:item:71779|h|h",
  categoryNodeIds: ["all"],
}

const CHAIN_RULE: CompiledOrderedRule = {
  id: "chain",
  categoryId: "all",
  action: "stock",
  destinationChain: [
    { destination: "character:by-priority", targetQuantity: 10 },
    { destination: "bank" },
  ],
}

const STOCKED = ctxWith({ getBankStock: () => 0 })

function outcomeOf(rules: readonly CompiledOrderedRule[]) {
  return walkRules(rules, FACTS, STOCKED).outcome
}

test("a matched stock chain states its target quantity in its label", () => {
  const outcome = outcomeOf([CHAIN_RULE])

  expect(outcome.kind === "matched" ? outcome.label : outcome.kind).toBe("Stock ×10")
})

test("a matched stock chain carries the target and the surplus sink on the outcome", () => {
  const outcome = outcomeOf([CHAIN_RULE])

  expect(outcome.kind === "matched" ? outcome.targetQuantity : undefined).toBe(10)
  expect(outcome.kind === "matched" ? outcome.destination : undefined).toBe("bank")
})

test("a flat stock rule carries the target quantity the rule itself names", () => {
  const outcome = outcomeOf([
    { id: "flat", categoryId: "all", action: "stock", destination: "bank", targetQuantity: 5 },
  ])

  expect(outcome.kind === "matched" ? outcome.targetQuantity : undefined).toBe(5)
  expect(outcome.kind === "matched" ? outcome.label : outcome.kind).toBe("Stock ×5")
})

test("an action that is not stock carries no target quantity", () => {
  const outcome = outcomeOf([
    { id: "move", categoryId: "all", action: "move-to", destination: "bank", targetQuantity: 5 },
  ])

  expect(outcome.kind === "matched" ? outcome.targetQuantity : "not matched").toBeUndefined()
  expect(outcome.kind === "matched" ? outcome.label : outcome.kind).toBe("Move to bank")
})

const PRIORITY_RULE: CompiledOrderedRule = {
  id: "priority",
  categoryId: "all",
  action: "stock",
  destination: "character:by-priority",
}

const RULE_LISTS: ReadonlyArray<readonly CompiledOrderedRule[]> = [
  [],
  [CHAIN_RULE],
  [{ id: "flat", categoryId: "all", action: "stock", destination: "bank", targetQuantity: 5 }],
  [{ id: "elsewhere", categoryId: "weapons", action: "sell" }],
  [PRIORITY_RULE, CHAIN_RULE],
  [CHAIN_RULE, PRIORITY_RULE],
]

test("the outcome-only run reaches the outcome the full run reaches", () => {
  for (const rules of RULE_LISTS) {
    expect(matchRules(rules, FACTS, STOCKED)).toEqual(walkRules(rules, FACTS, STOCKED).outcome)
  }
})

test("the outcome-only run stops at the first match", () => {
  const rules = [PRIORITY_RULE, PRIORITY_RULE]

  let fullAsked = 0
  const full = walkRules(
    rules,
    FACTS,
    ctxWith({
      getCharacterPriority: () => {
        fullAsked++
        return ["hero"]
      },
    })
  )

  let stoppedAsked = 0
  const stopped = matchRules(
    rules,
    FACTS,
    ctxWith({
      getCharacterPriority: () => {
        stoppedAsked++
        return ["hero"]
      },
    })
  )

  expect(stoppedAsked).toBeGreaterThan(0)
  expect(fullAsked).toBe(stoppedAsked * 2)
  expect(stopped).toEqual(full.outcome)
})
