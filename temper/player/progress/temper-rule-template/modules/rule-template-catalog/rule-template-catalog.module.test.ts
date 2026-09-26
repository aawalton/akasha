import { expect, test } from "bun:test"
import {
  RuleTemplatesUnread,
  ruleTemplates,
} from "akasha/temper/player/progress/temper-rule-template/modules/rule-template-catalog/rule-template-catalog.module.code.ts"
import { holdRuleTemplatesFromCheckout } from "akasha/temper/player/progress/temper-rule-template/modules/rule-template-catalog/rule-template-catalog.module.test-fixtures.ts"
import { goldStock } from "akasha/temper/player/progress/temper-rule-template/pages/gold-stock/gold-stock.temper-rule-template.ts"

test("asking for the templates before they are read is refused", () => {
  expect(() => ruleTemplates()).toThrow(RuleTemplatesUnread)
})

test("the templates the checkout holds are all read, each once", () => {
  const held = holdRuleTemplatesFromCheckout()
  expect(held.length).toBeGreaterThan(0)
  expect(new Set(held.map((one) => one.id)).size).toBe(held.length)
  expect(ruleTemplates()).toBe(held)
})

test("a template becomes a rule named by its key, holding the conditions beside its page", () => {
  const gold = holdRuleTemplatesFromCheckout().find((one) => one.id === goldStock.key)
  expect(gold).toEqual({
    id: goldStock.key,
    title: goldStock.title,
    notes: goldStock.description,
    goal: "use",
    categoryId: "currency-gold",
    action: "stock",
    stockScope: goldStock.stockScope,
    active: goldStock.active,
    conditions: { targetQuantity: 1000000 },
  })
})

test("the first template read is the one whose page states the lowest display order", () => {
  expect(holdRuleTemplatesFromCheckout()[0]?.id).toBe(goldStock.key)
  expect(goldStock.displayOrder).toBe(0)
})
