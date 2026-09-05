import { expect, test } from "bun:test"
import type { HeldRule } from "../inventory-rule-from-pages/inventory-rule-from-pages.module.code.ts"
import type { CategoryRule } from "../inventory-rule-types/inventory-rule-types.module.code.ts"
import { alreadySo, sameRows, valuesFor, writesFor } from "./inventory-rule-writes.module.code.ts"

const ACCOUNT = "9ba554f7-cb18-48bb-a709-ec935a895ca7"

const AN_INSTANT = "1970-01-01T00:00:00.000Z"

const A_ROW = { conditionField: "known", conditionValue: "known" }

function ruleOf(id: string, over: Partial<CategoryRule> = {}): CategoryRule {
  return { id, categoryId: "scripts", action: "sell", ...over }
}

function heldOf(id: string, at: number, over: Partial<HeldRule["page"]> = {}): HeldRule {
  return {
    page: {
      slug: `rule-${id}`,
      accountPage: ACCOUNT,
      categoryId: "scripts",
      displayOrder: at,
      action: "sell",
      active: true,
      updatedAt: AN_INSTANT,
      ...over,
    } as HeldRule["page"],
  }
}

test("a rule the pages already say is written again by nothing", () => {
  const said = writesFor([ruleOf("one")], [heldOf("one", 0)], ACCOUNT)
  expect(said.upserts).toEqual([])
  expect(said.deletes).toEqual([])
})

test("a rule the pages do not hold is written", () => {
  const said = writesFor([ruleOf("one")], [], ACCOUNT)
  expect(said.upserts.map((one) => one.slug)).toEqual(["rule-one"])
  expect(said.upserts[0]?.values.categoryId).toBe("scripts")
  expect(said.upserts[0]?.values.displayOrder).toBe(0)
})

test("a rule page no rule wants any more is taken away", () => {
  const said = writesFor([ruleOf("one")], [heldOf("one", 0), heldOf("two", 1)], ACCOUNT)
  expect(said.deletes).toEqual(["rule-two"])
})

test("a rule whose place among the rules moved is written again", () => {
  const said = writesFor(
    [ruleOf("two"), ruleOf("one")],
    [heldOf("one", 0), heldOf("two", 1)],
    ACCOUNT
  )
  expect(said.upserts.map((one) => one.slug)).toEqual(["rule-two", "rule-one"])
  expect(said.upserts[0]?.values.displayOrder).toBe(0)
  expect(said.upserts[1]?.values.displayOrder).toBe(1)
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
    ACCOUNT
  )
  expect(said.upserts[0]?.values.conditions).toEqual([A_ROW])
})

test("an entry key the page carries is named again where the rule carries no row", () => {
  const was: HeldRule = { ...heldOf("one", 0), conditions: [A_ROW] }
  const said = writesFor([ruleOf("one")], [was], ACCOUNT)
  expect(said.upserts[0]?.values.conditions).toEqual([])
})

test("rows the page already carries are no change", () => {
  const was: HeldRule = { ...heldOf("one", 0), conditions: [A_ROW] }
  const said = writesFor([ruleOf("one", { conditions: { known: "known" } })], [was], ACCOUNT)
  expect(said.upserts).toEqual([])
})

test("the id a landed row carries is no difference", () => {
  const landed = { id: "01a072b6-0546-7d78-8e19-d3cb86901c69", ...A_ROW }
  expect(sameRows([A_ROW], [landed as unknown as typeof A_ROW])).toBe(true)
})

test("a row the page does not carry is a difference", () => {
  expect(sameRows([A_ROW], [])).toBe(false)
})

test("a chain leg that moved is a change", () => {
  const was: HeldRule = { ...heldOf("one", 0), chain: [{ destination: "bank" }] }
  const said = writesFor(
    [ruleOf("one", { destinationChain: [{ destination: "craft-bag" }] })],
    [was],
    ACCOUNT
  )
  expect(said.upserts[0]?.values.destinationChain).toEqual([{ destination: "craft-bag" }])
})

test("a key the page states and the write does not name is left out of the comparison", () => {
  const was = heldOf("one", 0, { title: "an old title" })
  expect(alreadySo(was, { slug: "rule-one" })).toBe(true)
})

test("a title the rule changed is a change", () => {
  const was = heldOf("one", 0, { title: "an old title" })
  const said = writesFor([ruleOf("one", { title: "a new title" })], [was], ACCOUNT)
  expect(said.upserts[0]?.values.title).toBe("a new title")
})
