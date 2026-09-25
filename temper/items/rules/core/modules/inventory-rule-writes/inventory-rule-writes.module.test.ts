import { afterAll, expect, test } from "bun:test"
import { scratch } from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import {
  A_HELD_THING,
  bodyIn,
  composing,
} from "akasha/page/service/modules/page-composing/page-composing.module.test-fixtures.ts"
import type { HeldRule } from "akasha/temper/items/rules/core/modules/inventory-rule-from-pages/inventory-rule-from-pages.module.code.ts"
import type { CategoryRule } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import {
  alreadySo,
  sameRows,
  valuesFor,
  writesFor,
} from "akasha/temper/items/rules/core/modules/inventory-rule-writes/inventory-rule-writes.module.code.ts"
import { temperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.ts"
import { known } from "akasha/temper/player/progress/temper-condition-field/pages/known.temper-condition-field.ts"
import { temperConditionField } from "akasha/temper/player/progress/temper-condition-field/temper-condition-field.page-type.ts"
import { sell } from "akasha/temper/player/progress/temper-item-action/pages/sell.temper-item-action.ts"
import { temperItemAction } from "akasha/temper/player/progress/temper-item-action/temper-item-action.page-type.ts"

afterAll(scratch.sweep)

const ACCOUNT = "9ba554f7-cb18-48bb-a709-ec935a895ca7"

const AN_INSTANT = "1970-01-01T00:00:00.000Z"

const WRITTEN_AT = 1790000000000

const A_ROW = {
  conditionField: `${temperConditionField.slug}/${known.slug}` as const,
  conditionValue: "known",
}

function ruleOf(id: string, over: Partial<CategoryRule> = {}): CategoryRule {
  return { id, categoryId: "scripts", action: "sell", active: true, updatedAt: 0, ...over }
}

function heldOf(id: string, at: number, over: Partial<HeldRule["page"]> = {}): HeldRule {
  return {
    page: {
      slug: `rule-${id}`,
      accountPage: ACCOUNT,
      categoryId: `${temperItemCategoryTree.slug}/scripts` as const,
      displayOrder: at,
      action: `${temperItemAction.slug}/${sell.slug}` as const,
      active: true,
      updatedAt: AN_INSTANT,
      ...over,
    } as HeldRule["page"],
  }
}

test("a rule the pages already say is written again by nothing", () => {
  const said = writesFor([ruleOf("one")], [heldOf("one", 0)], ACCOUNT, WRITTEN_AT)
  expect(said.upserts).toEqual([])
  expect(said.deletes).toEqual([])
})

test("a rule the pages do not hold is written", () => {
  const said = writesFor([ruleOf("one")], [], ACCOUNT, WRITTEN_AT)
  expect(said.upserts.map((one) => one.slug)).toEqual(["rule-one"])
  expect(said.upserts[0]?.values.categoryId).toBe(`${temperItemCategoryTree.slug}/scripts`)
  expect(said.upserts[0]?.values.displayOrder).toBe(0)
})

test("a rule saying nothing about when it changed is written dated at the write", () => {
  const undated: CategoryRule = { id: "one", categoryId: "scripts", action: "sell", active: true }
  const said = writesFor([undated], [], ACCOUNT, WRITTEN_AT)
  expect(said.upserts[0]?.values.updatedAt).toBe(new Date(WRITTEN_AT).toISOString())
})

test("a rule is written switched on or off as the rule says", () => {
  const said = writesFor(
    [ruleOf("one", { active: false })],
    [heldOf("one", 0)],
    ACCOUNT,
    WRITTEN_AT
  )
  expect(said.upserts[0]?.values.active).toBe(false)
})

test("a rule page no rule wants any more is taken away", () => {
  const said = writesFor([ruleOf("one")], [heldOf("one", 0), heldOf("two", 1)], ACCOUNT, WRITTEN_AT)
  expect(said.deletes).toEqual(["rule-two"])
})

test("a rule whose place among the rules moved is written again", () => {
  const said = writesFor(
    [ruleOf("two"), ruleOf("one")],
    [heldOf("one", 0), heldOf("two", 1)],
    ACCOUNT,
    WRITTEN_AT
  )
  expect(said.upserts.map((one) => one.slug)).toEqual(["rule-two", "rule-one"])
  expect(said.upserts[0]?.values.displayOrder).toBe(0)
  expect(said.upserts[1]?.values.displayOrder).toBe(1)
})

test("two held rules sharing a display order are written apart in the order the rules are", () => {
  const said = writesFor(
    [ruleOf("one"), ruleOf("two")],
    [heldOf("one", 0), heldOf("two", 0)],
    ACCOUNT,
    WRITTEN_AT
  )
  expect(said.upserts.map((one) => [one.slug, one.values.displayOrder])).toEqual([["rule-two", 1]])
})

test("a rule carrying no row names no entry key", () => {
  const values = valuesFor({ page: heldOf("one", 0).page }, undefined)
  expect("conditions" in values).toBe(false)
  expect("destinationChain" in values).toBe(false)
})

test("a rule carrying rows names the entry key", () => {
  const said = writesFor(
    [ruleOf("one", { conditions: { known: "known" } })],
    [heldOf("one", 0)],
    ACCOUNT,
    WRITTEN_AT
  )
  expect(said.upserts[0]?.values.conditions).toEqual([A_ROW])
})

test("an entry key the page carries is named again where the rule carries no row", () => {
  const was: HeldRule = { ...heldOf("one", 0), conditions: [A_ROW] }
  const said = writesFor([ruleOf("one")], [was], ACCOUNT, WRITTEN_AT)
  expect(said.upserts[0]?.values.conditions).toEqual([])
})

test("rows the page already carries are no change", () => {
  const was: HeldRule = { ...heldOf("one", 0), conditions: [A_ROW] }
  const said = writesFor(
    [ruleOf("one", { conditions: { known: "known" } })],
    [was],
    ACCOUNT,
    WRITTEN_AT
  )
  expect(said.upserts).toEqual([])
})

test("the id a landed row carries is no difference", () => {
  const landed = { id: "01a072b6-0546-7d78-8e19-d3cb86901c69", ...A_ROW }
  expect(sameRows([A_ROW], [landed])).toBe(true)
})

test("a row the page does not carry is a difference", () => {
  expect(sameRows([A_ROW], [])).toBe(false)
})

test("a chain leg that moved is a change", () => {
  const was: HeldRule = { ...heldOf("one", 0), chain: [{ destination: "bank" }] }
  const said = writesFor(
    [ruleOf("one", { destinationChain: [{ destination: "craft-bag" }] })],
    [was],
    ACCOUNT,
    WRITTEN_AT
  )
  expect(said.upserts[0]?.values.destinationChain).toEqual([{ destination: "craft-bag" }])
})

test("a key the page states and the write does not name is left out of the comparison", () => {
  const was = heldOf("one", 0, { title: "an old title" })
  expect(alreadySo(was, { slug: "rule-one" })).toBe(true)
})

test("every field the rule dropped is cleared from the page", () => {
  const was = heldOf("one", 0, {
    title: "a title",
    description: "a note",
    goal: "a goal",
    locked: true,
    destination: "bank",
    stockScope: "account",
    craftShortfall: true,
  })
  const said = writesFor([ruleOf("one")], [was], ACCOUNT, WRITTEN_AT)
  expect([...(said.upserts[0]?.clears ?? [])].sort()).toEqual([
    "craftShortfall",
    "description",
    "destination",
    "goal",
    "locked",
    "stockScope",
    "title",
  ])
})

test("a field the page already lacks is no change", () => {
  expect(alreadySo(heldOf("one", 0), { slug: "rule-one" }, ["title"])).toBe(true)
  expect(alreadySo(heldOf("one", 0, { title: "x" }), { slug: "rule-one" }, ["title"])).toBe(false)
})

test("a title the rule dropped leaves the page through the merge", () => {
  const was = heldOf("one", 0, { title: "the name it already has" })
  const write = writesFor([ruleOf("one")], [was], ACCOUNT, WRITTEN_AT).upserts[0]
  expect(write?.clears).toEqual(["title"])
  const said = composing({ ...A_HELD_THING, values: {}, merge: true, clears: write?.clears ?? [] })
  expect(bodyIn(said)).not.toContain("title:")
  expect(bodyIn(said)).toContain('remark: "what was already noted"')
})

test("a title the rule changed is a change", () => {
  const was = heldOf("one", 0, { title: "an old title" })
  const said = writesFor([ruleOf("one", { title: "a new title" })], [was], ACCOUNT, WRITTEN_AT)
  expect(said.upserts[0]?.values.title).toBe("a new title")
})
