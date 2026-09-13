import { expect, test } from "bun:test"
import type { CompiledOrderedRule } from "akasha/temper/items-rules-core/modules/inventory-rule-compiler-types/inventory-rule-compiler-types.module.code.ts"
import { ctxWith } from "akasha/temper/items-rules-eval/modules/check-container-fixtures/check-container-fixtures.module.code.ts"
import { checkNumeric } from "akasha/temper/items-rules-eval/modules/check-numeric/check-numeric.module.code.ts"
import type { ItemFacts } from "akasha/temper/items-rules-eval/modules/item-facts/item-facts.module.code.ts"

const CTX = ctxWith({})

const NO_VALUES: ItemFacts = {
  itemId: 1,
  itemName: "Unpriced Thing",
  itemLink: "|H1:item:1|h|h",
  quality: 1,
  categoryNodeIds: ["all"],
}

const ZERO_THRESHOLD: CompiledOrderedRule = {
  categoryId: "all",
  action: "destroy",
  maxQuality: 1,
  marketValue: 0,
}

const LISTING_THRESHOLD: CompiledOrderedRule = {
  categoryId: "all",
  action: "sell",
  maxQuality: 4,
  marketValue: "MIN_LISTING_VALUE",
  marketValueOp: "<",
}

test("an unknown market value passes a zero threshold under the default operator", () => {
  expect(checkNumeric(ZERO_THRESHOLD, NO_VALUES, CTX)).toEqual({ kind: "pass" })
})

test("an unknown market value fails a threshold above zero", () => {
  expect(checkNumeric(LISTING_THRESHOLD, NO_VALUES, CTX)).toEqual({
    kind: "fail",
    conditionKind: "marketValue",
    detail: "estimatedValue undefined",
  })
})

test("a missing merchant value is compared as zero", () => {
  const rule: CompiledOrderedRule = { categoryId: "all", action: "destroy", merchantValue: 0 }

  expect(checkNumeric(rule, NO_VALUES, CTX)).toEqual({ kind: "pass" })
})

test("a missing replacement cost is compared as zero", () => {
  const rule: CompiledOrderedRule = { categoryId: "all", action: "destroy", replacementValue: 0 }

  expect(checkNumeric(rule, NO_VALUES, CTX)).toEqual({ kind: "pass" })
})
