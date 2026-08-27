import { describe, expect, test } from "bun:test"
import { propertiesFor } from "../../page/property/frontmatter.ts"
import { judgeFrontmatter } from "../../page/property/judge.ts"
import { namesIn, ruleFor } from "../../page/property/value.ts"
import { block, fileTreeOf, FILES, typeNamed, vocabularyIn, VOCABULARY } from "./page-frontmatter-fixture.ts"

function judging(type: string, stated: readonly string[], narrowing: readonly string[] = []) {
  const tree = fileTreeOf({
    ...FILES,
    "pages/page-property-definition/leaf-capture.page-property-definition.md": block(["defined-on-slug: leaf", "key: capture", `type: ${type}`, ...narrowing]),
  })
  const { properties, why } = propertiesFor(typeNamed("leaf", tree), tree)
  expect(why).toBeNull()
  return judgeFrontmatter(block(["domain: a-domain", ...stated]), "leaf", properties!, vocabularyIn(tree))
}

const CAPTURE = ["capture:", "  source: aura-game-design-session", "  through_line: 5695"]

describe("a key stating a map of scalars", () => {
  test("a map of names against values holds, whatever the names are", () => {
    expect(judging("map(text)", CAPTURE).refusals).toEqual([])
    expect(judging("map(text)", ["capture:", "  one: two"]).refusals).toEqual([])
  })

  test("the entries are held to the type the map names, one bad value refusing the key", () => {
    expect(judging("map(slug)", ["capture:", "  source: a-slug"]).refusals).toEqual([])
    expect(judging("map(slug)", ["capture:", "  source: Not A Slug"]).refusals.join("\n")).toContain(
      "`Not A Slug` at `source`"
    )
  })

  test("a map arm names its entries' type, so the vocabulary binds it with no name of its own", () => {
    expect(namesIn("map(text)")).toEqual(["text"])
    expect(namesIn("map(slug, max 3)")).toEqual(["slug"])
    expect(namesIn("map(text")).toEqual(["map(text"])
    expect(ruleFor("map(nonsense)", VOCABULARY).why).toContain("`nonsense` is a type this states no rule for")
  })

  const CASES: readonly (readonly [string, readonly string[], string])[] = [
    ["a scalar", ["capture: aura-game-design-session"], "`capture` holds one value"],
    ["a list", ["capture:", "  - source"], "`capture` holds a list"],
    ["a name holding a list", ["capture:", "  source:", "    - one"], "a list at `source`"],
    ["a name holding a map", ["capture:", "  source:", "    at: one"], "a map at `source`"],
  ]

  for (const [name, stated, says] of CASES)
    test(`${name} where a map is stated is refused, naming what stood there`, () => {
      const verdict = judging("map(text)", stated)
      expect(verdict.why).toBeNull()
      expect(verdict.refusals.join("\n")).toContain(says)
    })

  test("an empty map holds nothing, exactly as an empty list does", () => {
    const { rule } = ruleFor("map(text)", VOCABULARY)
    expect(rule!.holds({})).toMatchObject({ fault: "held", measured: "an empty map" })
  })

  test("a map past the count it states is refused, and one without a count is unbounded", () => {
    const three = ["capture:", "  a: one", "  b: two", "  c: three"]
    expect(judging("map(text, max 2)", three).refusals.join("\n")).toContain("`capture` holds a map of 3")
    expect(judging("map(text)", three).refusals).toEqual([])
  })

  test("the refusal names the type that was stated as well as what it wanted", () => {
    expect(judging("map(text, max 2)", ["capture: one"]).refusals).toEqual([
      "`capture` holds one value where `map(text, max 2)` states a map of at most 2, each value a non-empty value",
    ])
  })

  test("a narrowing beside the type reaches every value in the map, naming the one that failed", () => {
    const shaped = ['pattern: "^[a-z-]+$"', "backstop: 60"]
    expect(judging("map(text)", ["capture:", "  source: aura-session"], shaped).refusals).toEqual([])
    expect(judging("map(text)", ["capture:", "  source: Aura Session"], shaped).refusals.join("\n")).toContain(
      "`Aura Session` at `source`"
    )
  })
})
