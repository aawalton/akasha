import { describe, expect, test } from "bun:test"
import { propertiesFor } from "../../page/property/frontmatter.ts"
import { judgeFrontmatter } from "../../page/property/judge.ts"
import type { Property } from "../../page/property/property.ts"
import type { Vocabulary } from "../../page/property/stated.ts"
import { block, fileTreeOf, FILES, typeNamed, vocabularyIn } from "./page-frontmatter-fixture.ts"

function declared(lines: readonly string[]): { properties: readonly Property[]; vocabulary: Vocabulary } {
  const tree = fileTreeOf({ ...FILES, "pages/page-property-definition/leaf-handle.page-property-definition.md": block(["defined-on-slug: leaf", "key: handle", ...lines]) })
  const { properties, why } = propertiesFor(typeNamed("leaf", tree), tree)
  expect(why).toBeNull()
  return { properties: properties!, vocabulary: vocabularyIn(tree) }
}

function judging(lines: readonly string[], stated: readonly string[]) {
  const { properties, vocabulary } = declared(lines)
  return judgeFrontmatter(block(["domain: a-domain", ...stated]), "leaf", properties, vocabulary)
}

describe("a set stated as a list of the values themselves", () => {
  const CLOSED = ["type: lower-kebab-case", "values:", "  - approval", "  - refusal"]

  test("a value in the set holds, and the type it narrows still holds too", () => {
    expect(judging(CLOSED, ["handle: approval"]).refusals).toEqual([])
    expect(judging(CLOSED, ["handle: refusal"]).refusals).toEqual([])
  })

  test("a value outside the set is refused, and the refusal lists the whole set", () => {
    expect(judging(CLOSED, ["handle: approvals"]).refusals).toEqual([
      "`handle: approvals` is not a name in lower kebab case, one of `approval`, `refusal`, " +
        "which is what `lower-kebab-case` narrowed on `leaf` states",
    ])
  })

  test("a value the type refuses is refused by the type, whatever the set says", () => {
    expect(judging(CLOSED, ["handle: Approval"]).refusals.join("\n")).toContain("a name in lower kebab case")
  })

  test("a set that is neither a list nor a map leaves the key unjudged and says so", () => {
    expect(judging(["type: lower-kebab-case", "values: approval"], ["handle: approval"]).unjudged.join("\n")).toContain(
      "`values` states no set of the values this key may take"
    )
  })
})

describe("a set stated as a map, so that each value can carry what a person sees", () => {
  const LABELLED = ["type: lower-kebab-case", "values:", "  approval:", "    label: Approved", "  refusal:", "    label: Turned down"]

  test("the keys are the values admitted, exactly as the list form admits its entries", () => {
    expect(judging(LABELLED, ["handle: approval"]).refusals).toEqual([])
    expect(judging(LABELLED, ["handle: refusal"]).refusals).toEqual([])
  })

  test("a label is no value, so stating one admits nothing that was not already admitted", () => {
    expect(judging(LABELLED, ["handle: Approved"]).refusals.join("\n")).toContain("a name in lower kebab case")
    expect(judging(LABELLED, ["handle: approvals"]).refusals.join("\n")).toContain("one of `approval`, `refusal`")
  })

  test("the refusal names the keys rather than the labels, those being what may be written", () => {
    const said = judging(LABELLED, ["handle: nonsense"]).refusals.join("\n")
    expect(said).toContain("one of `approval`, `refusal`")
    expect(said).not.toContain("Turned down")
  })
})
const OWNS = (lines: readonly string[]): Readonly<Record<string, string>> => ({
  ...FILES,
  "pages/page-property-type/verdict.md": block(["id: 44444444-4444-7444-8444-444444444460", "type-slug: verdict", ...lines]),
  "pages/page-property-definition/leaf-handle.page-property-definition.md": block(["defined-on-slug: leaf", "key: handle", "type: verdict"]),
})

const OPEN = ["kind: select", "of: lower-kebab-case", "values:", "  - keep", "  - drop"]

function against(lines: readonly string[], stated: readonly string[]) {
  const tree = fileTreeOf(OWNS(lines))
  const { properties, why } = propertiesFor(typeNamed("leaf", tree), tree)
  expect(why).toBeNull()
  return judgeFrontmatter(block(["domain: a-domain", ...stated]), "leaf", properties!, vocabularyIn(tree))
}

describe("a set that is a type of its own, so several keys can name it", () => {
  test("a key typed against it takes the set, stating none of the values itself", () => {
    expect(against(OPEN, ["handle: keep"]).refusals).toEqual([])
    expect(against(OPEN, ["handle: drop"]).refusals).toEqual([])
  })

  test("a value outside the set is refused, and the refusal carries the whole set", () => {
    expect(against(OPEN, ["handle: tweak"]).refusals.join("\n")).toContain("one of `keep`, `drop`")
  })

  test("the type it narrows still binds, so a value that type refuses is refused first", () => {
    expect(against(OPEN, ["handle: Keep"]).refusals.join("\n")).toContain("a name in lower kebab case")
  })

  test("the members can carry what a person sees, the map form holding there as it does on a key", () => {
    const shown = ["kind: select", "of: lower-kebab-case", "values:", "  keep:", "    color: green"]
    expect(against(shown, ["handle: keep"]).refusals).toEqual([])
    expect(against(shown, ["handle: drop"]).refusals.join("\n")).toContain("one of `keep`")
  })

  test("a type stating a set without declaring itself one binds nothing, the kind being what says so", () => {
    const quiet = ["kind: constant", "of: lower-kebab-case", "values:", "  - keep", "  - drop"]
    const verdict = against(quiet, ["handle: tweak"])
    expect(verdict.refusals).toEqual([])
    expect(verdict.unjudged.join("\n")).toContain("`verdict` is a type this states no rule for")
  })
})

