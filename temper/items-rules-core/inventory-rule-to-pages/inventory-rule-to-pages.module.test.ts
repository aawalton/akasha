import { expect, test } from "bun:test"
import { rulesFromPages } from "../inventory-rule-from-pages/inventory-rule-from-pages.module.code.ts"
import type { CategoryRule } from "../inventory-rule-types/inventory-rule-types.module.code.ts"
import {
  instantOf,
  pageFromRule,
  pagesFromRules,
  spelling,
} from "./inventory-rule-to-pages.module.code.ts"

const ACCOUNT = "9ba554f7-cb18-48bb-a709-ec935a895ca7"

const RULE: CategoryRule = {
  id: "gold-stock",
  categoryId: "currency-gold",
  action: "stock",
  active: true,
  updatedAt: 1777910671132,
}

test("a rule's page is slugged from the id the rule carries", () => {
  expect(pageFromRule(RULE, ACCOUNT, 5).page.slug).toBe("rule-gold-stock")
})

test("where a rule falls is written as its display order", () => {
  expect(pageFromRule(RULE, ACCOUNT, 5).page.displayOrder).toBe(5)
})

test("the moment a rule changed is written as an instant", () => {
  expect(pageFromRule(RULE, ACCOUNT, 0).page.updatedAt).toBe("2026-05-04T16:04:31.132Z")
  expect(instantOf(0)).toBe("1970-01-01T00:00:00.000Z")
})

test("what the rule leaves unsaid is left off the page", () => {
  const page = pageFromRule(RULE, ACCOUNT, 0).page
  expect("title" in page).toBe(false)
  expect("description" in page).toBe(false)
  expect("goal" in page).toBe(false)
})

test("a title and notes the rule holds as nothing are left off the page", () => {
  const page = pageFromRule({ ...RULE, title: null, notes: null }, ACCOUNT, 0).page
  expect("title" in page).toBe(false)
  expect("description" in page).toBe(false)
})

test("a condition key is written as the field slug it names", () => {
  const held = pageFromRule({ ...RULE, conditions: { maxQuality: 1 } }, ACCOUNT, 0)
  expect(held.conditions).toEqual([{ conditionField: "max-quality", conditionValue: "1" }])
})

test("text no JSON reader would take is written as the text it is", () => {
  expect(spelling("not-stolen")).toBe("not-stolen")
})

test("text a JSON reader would take is written as JSON so it comes back as text", () => {
  expect(spelling("123")).toBe('"123"')
  expect(spelling("null")).toBe('"null"')
  expect(spelling("[1]")).toBe('"[1]"')
})

test("a list is written as JSON", () => {
  expect(spelling(["intricate", "ornate"])).toBe('["intricate","ornate"]')
})

test("a chain leg says only what that leg carries", () => {
  const held = pageFromRule(
    {
      ...RULE,
      destinationChain: [
        { destination: "character:by-priority", targetQuantity: 200 },
        { destination: "bank" },
      ],
    },
    ACCOUNT,
    0
  )
  expect(held.chain).toEqual([
    { destination: "character:by-priority", targetQuantity: 200 },
    { destination: "bank" },
  ])
})

test("a rule saying nothing about being switched on is written as switched on", () => {
  const bare: CategoryRule = { id: "a", categoryId: "weapons", action: "sell" }
  expect(pageFromRule(bare, ACCOUNT, 0).page.active).toBe(true)
})

test("a rule switched off is written as switched off", () => {
  expect(pageFromRule({ ...RULE, active: false }, ACCOUNT, 0).page.active).toBe(false)
})

test("a rule saying nothing about when it changed is written as the epoch", () => {
  const bare: CategoryRule = { id: "a", categoryId: "weapons", action: "sell" }
  expect(pageFromRule(bare, ACCOUNT, 0).page.updatedAt).toBe("1970-01-01T00:00:00.000Z")
})

test("every kind of condition value comes back as the value it was", () => {
  const rule: CategoryRule = {
    ...RULE,
    conditions: {
      maxQuality: 1,
      stolen: "not-stolen",
      traits: ["intricate", "ornate"],
      itemNamePattern: "123",
    },
  }
  const back = rulesFromPages(pagesFromRules([rule], ACCOUNT))
  expect(back[0]?.conditions).toEqual(rule.conditions)
})

test("a rule written out and read back is the rule it was", () => {
  const rule: CategoryRule = {
    ...RULE,
    title: "Stock gold",
    notes: "Keeps gold",
    goal: "use",
    locked: true,
    stockScope: "any-character",
    conditions: { targetQuantity: 1000000 },
    destinationChain: [{ destination: "bank" }],
  }
  expect(rulesFromPages(pagesFromRules([rule], ACCOUNT))[0]).toEqual(rule)
})
