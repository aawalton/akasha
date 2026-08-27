import { describe, expect, test } from "bun:test"
import { propertiesFor } from "../../page/property/frontmatter.ts"
import { judgeFrontmatter } from "../../page/property/judge.ts"
import { namesIn, ruleFor } from "../../page/property/value.ts"
import { block, fileTreeOf, FILES, typeNamed, vocabularyIn, VOCABULARY } from "./page-frontmatter-fixture.ts"

function judging(type: string, stated: readonly string[]) {
  const tree = fileTreeOf({
    ...FILES,
    "pages/page-property-definition/leaf-span.page-property-definition.md": block(["defined-on-slug: leaf", "key: span", `type: ${type}`]),
  })
  const { properties, why } = propertiesFor(typeNamed("leaf", tree), tree)
  expect(why).toBeNull()
  return judgeFrontmatter(block(["domain: a-domain", ...stated]), "leaf", properties!, vocabularyIn(tree))
}

describe("a key typed against the size ladder", () => {
  test("admits every rank the ladder holds", () => {
    for (const rank of ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"])
      expect(judging("size", [`span: ${rank}`]).refusals).toEqual([])
  })

  test("refuses a count where a rank is what it takes", () => {
    expect(judging("size", ["span: 200"]).refusals.join("\n")).toContain("is not a rank on the size ladder")
  })
})

describe("a key typed against a range", () => {
  test("admits one bound, and two written lower-upper", () => {
    expect(judging("range(number)", ["span: 3"]).refusals).toEqual([])
    expect(judging("range(number)", ["span: 0-10"]).refusals).toEqual([])
  })

  test("takes its bounds from the type it names, so a range of ranks holds", () => {
    expect(judging("range(size)", ["span: sm-3xl"]).refusals).toEqual([])
  })

  test("holds each bound to the type the range names", () => {
    expect(judging("range(number)", ["span: 0-ten"]).refusals.join("\n")).toContain("`ten` in a range")
  })

  test("refuses more bounds than a range holds", () => {
    expect(judging("range(number)", ["span: 1-2-3"]).refusals.join("\n")).toContain("2 separators")
  })

  test("a range arm names its bounds' type, so the vocabulary binds it with no name of its own", () => {
    expect(namesIn("range(number)")).toEqual(["number"])
    expect(ruleFor("range(nonsense)", VOCABULARY).why).toContain("`nonsense` is a type this states no rule for")
  })
})
