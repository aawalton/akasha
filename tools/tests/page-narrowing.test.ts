import { describe, expect, test } from "bun:test"
import { boundsFor } from "../../page/property/bounds.ts"
import { propertiesFor } from "../../page/property/frontmatter.ts"
import { judgeFrontmatter } from "../../page/property/judge.ts"
import { ruleFor } from "../../page/property/value.ts"
import type { Property } from "../../page/property/property.ts"
import type { Vocabulary } from "../../page/property/stated.ts"
import { hold, shapeOf } from "../../page/shape/shape.ts"
import { block, fileTreeOf, FILES, typeNamed, vocabularyIn } from "./page-frontmatter-fixture.ts"

const SHAPE = ["`^[a-z][a-z0-9-]*$`", "60 characters"] as const

const typing = (lines: readonly string[]): Readonly<Record<string, string>> => ({
  ...FILES,
  "pages/page-property-definition/leaf-handle.page-property-definition.md": block(["defined-on-slug: leaf", "key: handle", ...lines]),
})

function declared(lines: readonly string[]): { properties: readonly Property[]; vocabulary: Vocabulary } {
  const tree = fileTreeOf(typing(lines))
  const { properties, why } = propertiesFor(typeNamed("leaf", tree), tree)
  expect(why).toBeNull()
  return { properties: properties!, vocabulary: vocabularyIn(tree) }
}

function judging(lines: readonly string[], stated: readonly string[]) {
  const { properties, vocabulary } = declared(lines)
  return judgeFrontmatter(block(["domain: a-domain", ...stated]), "leaf", properties, vocabulary)
}

const SHAPED = ["type: text", 'pattern: "^[a-z][a-z0-9-]*$"', "backstop: 60"]

describe("a property narrowed to a shape by the expression it states", () => {
  test("a value of that shape holds, and the type it narrows still holds too", () => {
    expect(judging(SHAPED, ["handle: compact-deferred"]).refusals).toEqual([])
    expect(judging(SHAPED, ["handle: compact-deferred"]).unjudged).toEqual([])
  })

  test("a value the expression refuses is refused, and the refusal carries the expression", () => {
    const verdict = judging(SHAPED, ["handle: Compact Deferred"])
    expect(verdict.refusals.join("\n")).toContain("`handle: Compact Deferred` is not a non-empty value")
    for (const said of SHAPE) expect(verdict.refusals.join("\n")).toContain(said)
    expect(verdict.refusals.join("\n")).toContain("which is what `text` narrowed on `leaf` states")
  })

  test("a value past the backstop is refused even where the expression matches it", () => {
    const long = "a".repeat(61)
    expect(judging(SHAPED, [`handle: ${long}`]).refusals.join("\n")).toContain("60 characters")
    expect(judging(SHAPED, [`handle: ${"a".repeat(60)}`]).refusals).toEqual([])
  })

  test("a value of the wrong shape altogether is refused by the type before the expression is reached", () => {
    expect(judging(SHAPED, ["handle:", "  - one", "  - two"]).refusals.join("\n")).toContain("`handle` holds a list")
  })

  test("a list of the narrowed type holds each entry to the expression, naming the entry that failed", () => {
    const listed = ["type: list(text)", 'pattern: "^[a-z][a-z0-9-]*$"', "backstop: 60"]
    expect(judging(listed, ["handle:", "  - one", "  - two"]).refusals).toEqual([])
    expect(judging(listed, ["handle:", "  - one", "  - Two Words"]).refusals.join("\n")).toContain(
      "`Two Words` in a list"
    )
  })
})

describe("an expression this cannot read is reported rather than refused", () => {
  const CASES: readonly (readonly [string, readonly string[], string])[] = [
    [
      "an expression with no backstop beside it",
      ["type: text", 'pattern: "^[a-z]+$"'],
      "`backstop` states no count of characters beside it",
    ],
    ["a backstop that is not a count", ["type: text", 'pattern: "^[a-z]+$"', "backstop: lots"], "no count of characters"],
    ["a backstop with no expression beside it", ["type: text", "backstop: 60"], "`pattern` states no expression"],
    ["an expression that will not compile", ["type: text", 'pattern: "^[a-z"', "backstop: 60"], "no expression this can read"],
  ]

  for (const [name, lines, says] of CASES)
    test(`${name} leaves the key unjudged and says why`, () => {
      const verdict = judging(lines, ["handle: whatever it is"])
      expect(verdict.refusals).toEqual([])
      expect(verdict.unjudged.join("\n")).toContain(says)
    })
})

describe("a property stating no expression is judged exactly as it was", () => {
  test("its rule is the type's own, and the refusal names the type alone", () => {
    expect(judging(["type: text"], ["handle: anything at all"]).refusals).toEqual([])
    expect(judging(["type: lower-kebab-case"], ["handle: Not A Slug"]).refusals).toEqual([
      "`handle: Not A Slug` is not a name in lower kebab case, which is what `lower-kebab-case` states",
    ])
  })

  test("stating neither key leaves no bound behind", () => {
    expect(boundsFor({ pattern: null, backstop: null, values: null, max: null })).toEqual({ bounds: [], why: null })
  })

  test("the type's own rule is untouched by any of this", () => {
    const { vocabulary } = declared(["type: text"])
    expect(ruleFor("text", vocabulary).rule!.says).toBe("a non-empty value")
  })
})

const shaped = (slot: readonly string[]): string =>
  `${block(["blocks:", "  notice:", "    stands: 1-4", "    repeat: 1", "slots:", ...slot, "  body:", "    max: sm"])}\n# {notice}\n\n{body}\n`

describe("a slot narrowed to a shape by the expression it states", () => {
  const AT = ["  notice:", '    pattern: "^[a-z][a-z0-9-]*$"', "    backstop: 60"]

  const held = (heading: string) => {
    const shape = shapeOf("leaf", "pages/page-type/leaf.page-type.md", shaped(AT))
    expect(shape.why).toBeNull()
    return hold(shape, "notices/one.md", `# ${heading}\n\nwhat it says.\n`)
  }

  test("a heading of that shape holds", () => {
    expect(held("compact-deferred").ok).toBe(true)
  })

  test("a heading the expression refuses is refused", () => {
    expect(held("Compact Deferred").ok).toBe(false)
  })

  test("a heading past the backstop is refused, where a size rank of `sm` would have admitted it", () => {
    expect(held("a".repeat(61)).ok).toBe(false)
    expect(held("a".repeat(60)).ok).toBe(true)
  })

  const REFUSED: readonly (readonly [string, readonly string[], string])[] = [
    ["with no backstop beside it", ["  notice:", '    pattern: "^[a-z]+$"'], "`slots.notice.backstop` states no count"],
    [
      "with a backstop that is not a count",
      ["  notice:", '    pattern: "^[a-z]+$"', "    backstop: 0"],
      "`slots.notice.backstop` states no count",
    ],
    [
      "with an expression that will not compile",
      ["  notice:", '    pattern: "^[a-z"', "    backstop: 60"],
      "`slots.notice.pattern: ^[a-z` is no expression this can read",
    ],
  ]

  for (const [name, slot, says] of REFUSED)
    test(`a slot ${name} compiles to no shape, and the refusal says which key is missing`, () => {
      expect(shapeOf("leaf", "pages/page-type/leaf.page-type.md", shaped(slot)).why).toContain(says)
    })

  test("a slot declaring none of the four ways names all four", () => {
    expect(shapeOf("leaf", "pages/page-type/leaf.page-type.md", shaped(["  notice:", "    nonsense: 1"])).why).toBe(
      "`slots.notice` declares none of `values:`, `to:`, `pattern:` or `max:`"
    )
  })
})

describe("a property narrowed to a ceiling by the rank it states", () => {
  const CAPPED = ["type: text", "max: sm"]

  test("a value within the rank holds and one past it is refused, naming the count", () => {
    expect(judging(CAPPED, [`handle: ${"a".repeat(100)}`]).refusals).toEqual([])
    expect(judging(CAPPED, [`handle: ${"a".repeat(101)}`]).refusals.join("\n")).toContain("within 100 characters")
  })

  test("a rank that is no step on the ladder leaves the key unjudged and names the ladder", () => {
    const verdict = judging(["type: text", "max: enormous"], ["handle: whatever"])
    expect(verdict.refusals).toEqual([])
    expect(verdict.unjudged.join("\n")).toContain("`max: enormous` names no rank on the ladder")
  })

  test("a ceiling and a set narrow one value together, and the refusal carries both", () => {
    const both = ["type: text", "max: xs", "values:", "  - a short one", "  - another short one"]
    expect(judging(both, ["handle: a short one"]).refusals).toEqual([])
    expect(judging(both, ["handle: a third one"]).refusals.join("\n")).toContain(
      "one of `a short one`, `another short one`, within 50 characters"
    )
  })
})

const choosing = (person: readonly string[], persona: readonly string[], stated: readonly string[]) => {
  const tree = fileTreeOf({
    ...FILES,
    "pages/page-property-definition/leaf-person.page-property-definition.md": block(["defined-on-slug: leaf", "key: person", "type: lower-kebab-case", ...person]),
    "pages/page-property-definition/leaf-persona.page-property-definition.md": block(["defined-on-slug: leaf", "key: persona", "type: lower-kebab-case", ...persona]),
  })
  const { properties } = propertiesFor(typeNamed("leaf", tree), tree)
  return judgeFrontmatter(block(["domain: a-domain", ...stated]), "leaf", properties!, vocabularyIn(tree))
}

const HOLDER = ["one-of: holder"]

describe("exactly one of a set of keys", () => {
  test("a document naming one of them holds, whichever one it names", () => {
    expect(choosing(HOLDER, HOLDER, ["person: alan"]).refusals).toEqual([])
    expect(choosing(HOLDER, HOLDER, ["persona: athena"]).refusals).toEqual([])
  })

  test("a document naming both is refused, and the refusal names what it stated", () => {
    expect(choosing(HOLDER, HOLDER, ["person: alan", "persona: athena"]).refusals).toEqual([
      "exactly one of `person`, `persona` stands, which is the `holder` choice on `leaf`, " +
        "and this states `person` and `persona`",
    ])
  })

  test("a document naming neither is refused by the same choice", () => {
    expect(choosing(HOLDER, HOLDER, []).refusals).toEqual([
      "exactly one of `person`, `persona` stands, which is the `holder` choice on `leaf`, and this states none of them",
    ])
  })

  test("a choice standing over one key alone is reported rather than refused", () => {
    const verdict = choosing(HOLDER, [], [])
    expect(verdict.refusals).toEqual([])
    expect(verdict.unjudged.join("\n")).toContain("a choice stands over two keys or more")
  })

  test("a property set where nothing states `one-of:` levies no choice at all", () => {
    expect(choosing([], [], []).refusals).toEqual([])
    expect(choosing([], [], ["person: alan", "persona: athena"]).refusals).toEqual([])
  })
})

const both = (above: readonly string[], below: readonly string[] | null, stated: readonly string[]) => {
  const tree = fileTreeOf({
    ...FILES,
    "pages/page-property-definition/root-handle.page-property-definition.md": block(["defined-on-slug: root", "key: handle", ...above]),
    ...(below === null ? {} : { "pages/page-property-definition/leaf-handle.page-property-definition.md": block(["defined-on-slug: leaf", "key: handle", ...below]) }),
  })
  const { properties } = propertiesFor(typeNamed("leaf", tree), tree)
  return judgeFrontmatter(block(["domain: a-domain", ...stated]), "leaf", properties!, vocabularyIn(tree))
}

const WIDE = ["type: text"]
const NARROW = ["type: text", "narrows-slug: root", 'pattern: "^[a-z]+$"', "backstop: 8"]

describe("a page type tightening a key its ancestor declares", () => {
  test("a value both declarations admit holds", () => {
    expect(both(WIDE, NARROW, ["handle: tighter"]).refusals).toEqual([])
  })

  test("a value the narrower one refuses is refused, though the ancestor's own rule admits it", () => {
    expect(both(WIDE, null, ["handle: A Wide Value"]).refusals).toEqual([])
    expect(both(WIDE, NARROW, ["handle: A Wide Value"]).refusals.join("\n")).toContain("matching `^[a-z]+$`")
  })

  test("a value the ancestor refuses is still refused, so a narrowing can never widen", () => {
    const listing = ["type: list(text)", "narrows-slug: root", 'pattern: "^[a-z]+$"', "backstop: 8"]
    expect(both(WIDE, listing, ["handle: tighter"]).refusals.join("\n")).toContain("`handle` holds one value")
  })

  test("a redeclaration that says nothing is refused, and the refusal names both files and the shape side", () => {
    const verdict = both(WIDE, WIDE.concat('pattern: "^[a-z]+$"', "backstop: 8"), ["handle: tighter"])
    const said = verdict.refusals.join("\n")
    expect(said).toContain("pages/page-property-definition/root-handle.page-property-definition.md")
    expect(said).toContain("pages/page-property-definition/leaf-handle.page-property-definition.md")
    expect(said).toContain("neither states `narrows-slug:`")
    expect(said).toContain("page/shape/shape.ts")
  })

  test("a narrowing naming a page type that declares nothing here is refused, naming what it stated", () => {
    expect(both(WIDE, ["type: text", "narrows-slug: nowhere"], ["handle: tighter"]).refusals.join("\n")).toContain(
      "`narrows-slug: nowhere`, and no page type it extends declares `handle`"
    )
  })

  test("a narrowing naming its own page type is refused, a declaration narrowing nothing but itself", () => {
    expect(both(WIDE, ["type: text", "narrows-slug: leaf"], ["handle: tighter"]).refusals.join("\n")).toContain(
      "`narrows-slug: leaf`"
    )
  })

  test("a key declared once is judged exactly as it was, whatever `narrows-slug:` would have done", () => {
    expect(both(WIDE, null, ["handle: anything at all"]).refusals).toEqual([])
  })

  test("a key required on either declaration is owed once, not once per declaration", () => {
    const owed = both(WIDE.concat("required: true"), NARROW.concat("required: true"), [])
    expect(owed.refusals.filter((one) => one.includes("is required on"))).toHaveLength(1)
  })

  test("a key optional above and required on the narrowing is owed by the narrower type", () => {
    expect(both(WIDE, NARROW.concat("required: true"), []).refusals.join("\n")).toContain(
      "`handle` is required on `leaf` and this states none"
    )
  })

  test("that tightening reaches the narrower type alone, the ancestor's own pages owing nothing", () => {
    const tree = fileTreeOf({
      ...FILES,
      "pages/page-property-definition/root-handle.page-property-definition.md": block(["defined-on-slug: root", "key: handle", ...WIDE]),
      "pages/page-property-definition/leaf-handle.page-property-definition.md": block([
        "defined-on-slug: leaf",
        "key: handle",
        ...NARROW.concat("required: true"),
      ]),
    })
    const { properties } = propertiesFor(typeNamed("root", tree), tree)
    const stated = block(["id: 33333333-3333-7333-8333-333333333333"])
    expect(judgeFrontmatter(stated, "root", properties!, vocabularyIn(tree)).refusals).toEqual([])
  })
})
