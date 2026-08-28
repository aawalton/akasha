import { describe, expect, test } from "bun:test"
import { propertiesFor } from "../../page/property/frontmatter.ts"
import { judgeFrontmatter } from "../../page/property/judge.ts"
import { block, fileTreeOf, FILES, typeNamed, vocabularyIn } from "./page-frontmatter-fixture.ts"

const typed = (type: string): Readonly<Record<string, string>> => ({
  ...FILES,
  "pages/page-property-type/mark.md": block(["id: 44444444-4444-7444-8444-444444444450", "type-slug: mark", "kind: record"]),
  "pages/page-property-definition/mark-label.page-property-definition.md": block(["defined-on-slug: mark", "key: label", "type: text"]),
  "pages/page-property-definition/mark-color.page-property-definition.md": block([
    "defined-on-slug: mark",
    "key: color",
    "type: lower-kebab-case",
    "values:",
    "  - green",
    "  - red",
  ]),
  "pages/page-property-type/pin.md": block(["id: 44444444-4444-7444-8444-444444444451", "type-slug: pin", "kind: record"]),
  "pages/page-property-definition/pin-at.page-property-definition.md": block(["defined-on-slug: pin", "key: at", "type: lower-kebab-case", "required: true"]),
  "pages/page-property-definition/leaf-handle.page-property-definition.md": block(["defined-on-slug: leaf", "key: handle", `type: ${type}`]),
})

function judging(type: string, stated: readonly string[]) {
  const tree = fileTreeOf(typed(type))
  const { properties, why } = propertiesFor(typeNamed("leaf", tree), tree)
  expect(why).toBeNull()
  return judgeFrontmatter(block(["domain: a-domain", ...stated]), "leaf", properties!, vocabularyIn(tree))
}

const said = (type: string, stated: readonly string[]): string => judging(type, stated).refusals.join("\n")

describe("a value built from several types, each under a name", () => {
  test("a map of the fields it declares holds, and so does one stating only some of them", () => {
    expect(judging("map(mark)", ["handle:", "  first:", "    label: One", "    color: green"]).refusals).toEqual([])
    expect(judging("map(mark)", ["handle:", "  first:", "    color: green"]).refusals).toEqual([])
  })

  test("a key the record does not declare is refused, and the refusal names it", () => {
    expect(said("map(mark)", ["handle:", "  first:", "    icon: star"])).toContain(
      "`icon`, which `mark` does not declare"
    )
  })

  test("a field is held to the type it declares, exactly as a key of its own would be", () => {
    expect(said("map(mark)", ["handle:", "  first:", "    color: Green"])).toContain(
      "`Green` at `color` at `first`, where `color` takes a name in lower kebab case"
    )
  })

  test("a field narrowed by the values it states is held to that set too", () => {
    expect(said("map(mark)", ["handle:", "  first:", "    color: blue"])).toContain(
      "where `color` takes a name in lower kebab case, one of `green`, `red`"
    )

    expect(said("map(mark)", ["handle:", "  first:", "    label:"])).toContain(
      "holds nothing at `label` at `first`, where `label` takes a non-empty value"
    )
  })

  test("a scalar where a record belongs is refused rather than read as its one field", () => {
    expect(said("map(mark)", ["handle:", "  first: green"])).toContain("one value")
  })
})

describe("a record stated with nothing under it", () => {
  test("holds where the record requires no field, the name alone being the whole statement", () => {
    expect(judging("map(mark)", ["handle:", "  first:"]).refusals).toEqual([])
  })

  test("is refused where the record requires one, and the refusal names the field it wanted", () => {
    expect(said("map(pin)", ["handle:", "  first:"])).toContain("no `at`")
  })
})
