import { expect, test } from "bun:test"
import type { CompiledOrderedRule } from "akasha/temper/items-rules-core/modules/inventory-rule-compiler-types/inventory-rule-compiler-types.module.code.ts"
import { checkNumeric } from "akasha/temper/items-rules-eval/modules/check-numeric/check-numeric.module.code.ts"
import type { ItemFacts } from "akasha/temper/items-rules-eval/modules/item-facts/item-facts.module.code.ts"
import { ctxWith } from "akasha/temper/items-rules-eval/test-fixtures/check-container-fixtures/check-container-fixtures.test-fixture.code.ts"

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
    detail: "marketValue undefined",
  })
})

const NO_TABLE = { ...ctxWith({}), priceTableMissing: true }

const HAS_TABLE = { ...ctxWith({}), priceTableMissing: false }

test("an unknown market value still passes a zero threshold where the source holds a table", () => {
  expect(checkNumeric(ZERO_THRESHOLD, NO_VALUES, HAS_TABLE)).toEqual({ kind: "pass" })
  expect(checkNumeric(ZERO_THRESHOLD, NO_VALUES, CTX)).toEqual({ kind: "pass" })
})

test("a priced item is judged on its price whether or not a table is claimed missing", () => {
  const priced: ItemFacts = { ...NO_VALUES, marketValue: 12 }
  expect(checkNumeric(ZERO_THRESHOLD, priced, NO_TABLE)).toEqual({
    kind: "fail",
    conditionKind: "marketValue",
    detail: "12 <= 0",
  })
})

test("an unknown market value with no price table is indeterminate rather than worth nothing", () => {
  expect(checkNumeric(ZERO_THRESHOLD, NO_VALUES, NO_TABLE)).toEqual({
    kind: "indeterminate",
    conditionKind: "marketValue",
    missingSignal: "ttc-price-table",
  })
})

test("a threshold an unknown market value already fails still fails with no price table", () => {
  expect(checkNumeric(LISTING_THRESHOLD, NO_VALUES, NO_TABLE)).toEqual({
    kind: "fail",
    conditionKind: "marketValue",
    detail: "marketValue undefined",
  })
})

test("an item with no value signal at all is indeterminate with no price table", () => {
  const rule: CompiledOrderedRule = { categoryId: "all", action: "destroy", value: 0 }
  expect(checkNumeric(rule, NO_VALUES, CTX)).toEqual({ kind: "pass" })
  expect(checkNumeric(rule, NO_VALUES, NO_TABLE)).toEqual({
    kind: "indeterminate",
    conditionKind: "value",
    missingSignal: "ttc-price-table",
  })
})

test("a merchant value is read as zero whether or not a price table is there", () => {
  const rule: CompiledOrderedRule = { categoryId: "all", action: "destroy", merchantValue: 0 }
  expect(checkNumeric(rule, NO_VALUES, NO_TABLE)).toEqual({ kind: "pass" })
})

test("a missing merchant value is compared as zero", () => {
  const rule: CompiledOrderedRule = { categoryId: "all", action: "destroy", merchantValue: 0 }

  expect(checkNumeric(rule, NO_VALUES, CTX)).toEqual({ kind: "pass" })
})

test("a missing replacement cost is compared as zero", () => {
  const rule: CompiledOrderedRule = { categoryId: "all", action: "destroy", replacementValue: 0 }

  expect(checkNumeric(rule, NO_VALUES, CTX)).toEqual({ kind: "pass" })
})
