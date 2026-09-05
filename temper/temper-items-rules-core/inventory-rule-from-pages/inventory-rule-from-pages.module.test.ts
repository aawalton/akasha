import { expect, test } from "bun:test"
import type { HeldRule, RulePage } from "./inventory-rule-from-pages.module.code.ts"
import { ruleFromPage, rulesFromPages } from "./inventory-rule-from-pages.module.code.ts"

const PAGE: RulePage = {
  slug: "rule-gold-stock",
  categoryId: "currency-gold",
  displayOrder: 5,
  action: "stock",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
}

test("a rule's id is its slug without the leading `rule-`", () => {
  expect(ruleFromPage({ page: PAGE }).id).toBe("gold-stock")
})

test("a slug carrying no such opening is the id unchanged", () => {
  expect(ruleFromPage({ page: { ...PAGE, slug: "90d1aa3b" } }).id).toBe("90d1aa3b")
})

test("an instant is read back as the milliseconds the game is told", () => {
  expect(ruleFromPage({ page: PAGE }).updatedAt).toBe(1777910671132)
})

test("an updated-at that is no instant refuses rather than reading as nothing", () => {
  expect(() => ruleFromPage({ page: { ...PAGE, updatedAt: "the fourth of May" } })).toThrow()
})

test("a property the page leaves unsaid is left off the rule", () => {
  const held = ruleFromPage({ page: PAGE })
  expect("title" in held).toBe(false)
  expect("notes" in held).toBe(false)
  expect("goal" in held).toBe(false)
  expect("locked" in held).toBe(false)
  expect("conditions" in held).toBe(false)
  expect("destinationChain" in held).toBe(false)
})

test("a description is what the game reads as notes", () => {
  expect(ruleFromPage({ page: { ...PAGE, description: "Keeps gold" } }).notes).toBe("Keeps gold")
})

test("a condition field is read under the key the engine reads", () => {
  const held = ruleFromPage({
    page: PAGE,
    conditions: [{ conditionField: "max-quality", conditionValue: "1" }],
  })
  expect(held.conditions).toEqual({ maxQuality: 1 })
})

test("a condition value that is JSON is read as JSON", () => {
  const held = ruleFromPage({
    page: PAGE,
    conditions: [{ conditionField: "traits", conditionValue: '["intricate","ornate"]' }],
  })
  expect(held.conditions).toEqual({ traits: ["intricate", "ornate"] })
})

test("a condition value that is no JSON is read as the text it is", () => {
  const held = ruleFromPage({
    page: PAGE,
    conditions: [{ conditionField: "stolen", conditionValue: "not-stolen" }],
  })
  expect(held.conditions).toEqual({ stolen: "not-stolen" })
})

test("a chain is read leg by leg, and a leg says only what it carries", () => {
  const held = ruleFromPage({
    page: PAGE,
    chain: [{ destination: "character:by-priority", targetQuantity: 200 }, { destination: "bank" }],
  })
  expect(held.destinationChain).toEqual([
    { destination: "character:by-priority", targetQuantity: 200 },
    { destination: "bank" },
  ])
})

test("a leg's character test is read back as the shape the matcher reads", () => {
  const held = ruleFromPage({
    page: PAGE,
    chain: [
      {
        destination: "bank",
        charEligibility:
          '{"requiredSkillLines":{"mode":"any-not-maxed","skillLineIds":["world-legerdemain"]}}',
      },
    ],
  })
  expect(held.destinationChain?.[0]?.charEligibility).toEqual({
    requiredSkillLines: { mode: "any-not-maxed", skillLineIds: ["world-legerdemain"] },
  })
})

test("rules come back in display order however they arrived", () => {
  const held: readonly HeldRule[] = [
    { page: { ...PAGE, slug: "rule-c", displayOrder: 2 } },
    { page: { ...PAGE, slug: "rule-a", displayOrder: 0 } },
    { page: { ...PAGE, slug: "rule-b", displayOrder: 1 } },
  ]
  expect(rulesFromPages(held).map((one) => one.id)).toEqual(["a", "b", "c"])
})

test("reading rules leaves what the caller handed over unchanged", () => {
  const held: readonly HeldRule[] = [
    { page: { ...PAGE, slug: "rule-b", displayOrder: 1 } },
    { page: { ...PAGE, slug: "rule-a", displayOrder: 0 } },
  ]
  rulesFromPages(held)
  expect(held.map((one) => one.page.slug)).toEqual(["rule-b", "rule-a"])
})
