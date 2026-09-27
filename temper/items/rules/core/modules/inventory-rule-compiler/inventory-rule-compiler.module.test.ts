import { expect, test } from "bun:test"
import { compileCategoryRuleToOrdered } from "akasha/temper/items/rules/core/modules/inventory-rule-compiler/inventory-rule-compiler.module.code.ts"
import type { CategoryRule } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"

const STOCK: CategoryRule = { id: "83678d83", categoryId: "drink", action: "stock", active: true }

test("a stocking rule saying it crafts its shortfall compiles as crafting it", () => {
  expect(compileCategoryRuleToOrdered({ ...STOCK, craftShortfall: true }).craftShortfall).toBe(true)
})

test("a stocking rule saying nothing of crafting compiles as not crafting", () => {
  expect("craftShortfall" in compileCategoryRuleToOrdered(STOCK)).toBe(false)
  expect(
    "craftShortfall" in compileCategoryRuleToOrdered({ ...STOCK, craftShortfall: false })
  ).toBe(false)
})

test("a rule that does not stock never compiles as crafting", () => {
  const sell: CategoryRule = { ...STOCK, action: "sell", craftShortfall: true }
  expect("craftShortfall" in compileCategoryRuleToOrdered(sell)).toBe(false)
})

test("a stocking rule saying it buys its shortfall compiles as buying it", () => {
  expect(compileCategoryRuleToOrdered({ ...STOCK, buyShortfall: true }).buyShortfall).toBe(true)
})

test("a stocking rule saying nothing of buying compiles as not buying", () => {
  expect("buyShortfall" in compileCategoryRuleToOrdered(STOCK)).toBe(false)
  expect("buyShortfall" in compileCategoryRuleToOrdered({ ...STOCK, buyShortfall: false })).toBe(
    false
  )
})

test("a rule that does not stock never compiles as buying", () => {
  const sell: CategoryRule = { ...STOCK, action: "sell", buyShortfall: true }
  expect("buyShortfall" in compileCategoryRuleToOrdered(sell)).toBe(false)
})

test("a rule buying its shortfall compiles the most it pays for one", () => {
  const buying: CategoryRule = { ...STOCK, buyShortfall: true, buyMaxPrice: 40 }
  expect(compileCategoryRuleToOrdered(buying).buyMaxPrice).toBe(40)
})

test("a price on a rule not buying, or a price of zero, compiles as no price", () => {
  expect("buyMaxPrice" in compileCategoryRuleToOrdered({ ...STOCK, buyMaxPrice: 40 })).toBe(false)
  const zero: CategoryRule = { ...STOCK, buyShortfall: true, buyMaxPrice: 0 }
  expect("buyMaxPrice" in compileCategoryRuleToOrdered(zero)).toBe(false)
})
