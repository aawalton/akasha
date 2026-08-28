import { afterAll, describe, expect, it } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { answer, statesBoth } from "../lib/page-query.ts"
import { queryOf } from "../lib/page-query-fields.ts"
import type { Roots } from "../../page/page.ts"

const page = (lines: readonly string[]): string => `---\n${lines.join("\n")}\n---\n`

const FILES: Readonly<Record<string, string>> = {
  "pages/page-type/meter.page-type.md": page(["extends-slug: none"]),

  "pages/page-property-definition/meter-used.page-property-definition.md": page(["defined-on-slug: meter", "key: used", "type: number"]),
  "pages/page-property-definition/meter-label.page-property-definition.md": page(["defined-on-slug: meter", "key: label", "type: text"]),

  "pages/meter/one.meter.md": page(["used: 10", "label: 10"]),
  "pages/meter/two.meter.md": page(["used: 20", "label: 20"]),
  "pages/meter/three.meter.md": page(["used: 60", "label: 60"]),
  "pages/meter/silent.meter.md": page(["label: nothing"]),
}

const root = mkdtempSync(join("/var/tmp", "page-query-reduce-"))

for (const [relPath, text] of Object.entries(FILES)) {
  mkdirSync(join(root, relPath, ".."), { recursive: true })
  writeFileSync(join(root, relPath), text)
}

afterAll(() => rmSync(root, { recursive: true, force: true }))

const ROOTS: Roots = { akasha: root }

describe("a page query reducing the pages it matched", () => {
  it("means the target over the pages that carry it, and skips the ones that do not", () => {
    const got = answer(ROOTS, { pageType: "meter", function: "mean", target: "used" })
    expect(got!.value).toBe(30)
    expect(got!.n).toBe(4)
  })

  it("sums the same target over the same pages", () => {
    expect(answer(ROOTS, { pageType: "meter", function: "sum", target: "used" })!.value).toBe(90)
  })

  it("reduces what the tests left, rather than the whole page type", () => {
    const got = answer(ROOTS, {
      pageType: "meter",
      where: [{ key: "used", atOrAfter: "20" }],
      function: "mean",
      target: "used",
    })
    expect(got!.value).toBe(40)
  })

  it("resolves to nothing where the target is not declared a number", () => {
    expect(answer(ROOTS, { pageType: "meter", function: "mean", target: "label" })!.value).toBeNull()
  })

  it("resolves to nothing where no page carries the target", () => {
    expect(answer(ROOTS, { pageType: "meter", function: "mean", target: "absent" })!.value).toBeNull()
  })

  it("answers no value where the query states no function", () => {
    expect(answer(ROOTS, { pageType: "meter" })!.value).toBeNull()
  })
})

describe("a page query document stating both a count by and a function", () => {
  it("is read as stating both, which is what the service refuses on", () => {
    const query = queryOf(
      page(["page-type: meter", "count-by:\n  - label", "function: mean", "target: used"])
    )
    expect(statesBoth(query!)).toBe(true)
  })

  it("is not read as stating both where it states only one of them", () => {
    const counting = queryOf(page(["page-type: meter", "count-by:\n  - label"]))
    const reducing = queryOf(page(["page-type: meter", "function: mean", "target: used"]))
    expect(statesBoth(counting!)).toBe(false)
    expect(statesBoth(reducing!)).toBe(false)
  })

  it("keeps a function the language does not name out of the query altogether", () => {
    const query = queryOf(page(["page-type: meter", "function: median", "target: used"]))
    expect(query!.function).toBeUndefined()
  })
})

describe("a pair of bounds stating the same value over the same property", () => {
  it("divides the pages carrying a value in two, each falling on one side", () => {
    const under = answer(ROOTS, { pageType: "meter", where: [{ key: "used", before: "20" }] })
    const from = answer(ROOTS, { pageType: "meter", where: [{ key: "used", atOrAfter: "20" }] })
    expect(under!.n).toBe(1)
    expect(from!.n).toBe(2)
  })

  it("leaves a page carrying no value at all on neither side", () => {
    const all = answer(ROOTS, { pageType: "meter" })
    expect(all!.n).toBe(4)
  })

  it("compares a bound as a number where the property is declared one", () => {
    const got = answer(ROOTS, { pageType: "meter", where: [{ key: "used", before: "100" }] })
    expect(got!.n).toBe(3)
  })
})

describe("what a reduced answer says about how far it reached", () => {
  it("counts the pages that carried the target, which is fewer than the pages it matched", () => {
    const got = answer(ROOTS, { pageType: "meter", function: "mean", target: "used" })
    expect(got!.n).toBe(4)
    expect(got!.over).toBe(3)
  })

  it("says it reached none where the pages carry no such property", () => {
    const got = answer(ROOTS, { pageType: "meter", function: "mean", target: "absent" })
    expect(got!.value).toBeNull()
    expect(got!.over).toBe(0)
  })

  it("says it reached none where the target is not declared a number", () => {
    const got = answer(ROOTS, { pageType: "meter", function: "mean", target: "label" })
    expect(got!.over).toBe(0)
  })

  it("says it reached none where the tests left nothing to reduce", () => {
    const got = answer(ROOTS, {
      pageType: "meter",
      where: [{ key: "used", atOrAfter: "1000" }],
      function: "mean",
      target: "used",
    })
    expect(got!.n).toBe(0)
    expect(got!.over).toBe(0)
  })

  it("says nothing at all about reaching where the query asked for no value", () => {
    const got = answer(ROOTS, { pageType: "meter" })
    expect(got!.value).toBeNull()
    expect(got!.over).toBeNull()
  })
})
