import { describe, expect, test } from "bun:test"
import { pageTypeChain, propertiesFor } from "../../page/property/frontmatter.ts"
import { judgeFrontmatter } from "../../page/property/judge.ts"
import { namesIn, OWN_TYPE, ruleFor } from "../../page/property/value.ts"
import type { FileTree } from "../../page/file-tree.ts"
import type { Vocabulary } from "../../page/property/stated.ts"
import { shapeOf } from "../../page/shape/shape.ts"
import {
  block,
  fileTreeOf,
  declaredOn,
  FILES,
  LEAF,
  LEAF_ID,
  NAMES,
  NAMING_ID,
  nameOf,
  PLACED,
  ROOT_ID,
  stating,
  typeNamed,
  under,
  vocabularyIn,
  VOCABULARY,
  WHOLE,
} from "./page-frontmatter-fixture.ts"

const judged = (changes: Readonly<Record<string, string | null>>, vocabulary: Vocabulary = VOCABULARY) =>
  judgeFrontmatter(stating(changes), "leaf", LEAF, vocabulary)

describe("what a page type and its ancestors declare", () => {
  test("the walk up `extends-slug` reaches the properties defined on the page type above", () => {
    const wanted = [
      ...under("pages/page-property-definition/leaf-"),
      ...under("pages/page-property-definition/root-"),
    ]
      .map(nameOf)
      .sort()
    expect(LEAF.map((one) => one.name).sort()).toEqual(wanted)
    expect(LEAF.find((one) => one.name === "made-at")?.on).toBe("root")
  })

  test("a definition binds the key it states, its file name answering only where it states none", () => {
    const stated = fileTreeOf({
      ...FILES,
      "pages/page-property-definition/leaf-misnamed.page-property-definition.md": block(["defined-on-slug: leaf", "key: handle", "type: text"]),
    })
    const names = declaredOn("leaf", stated).map((one) => one.name)
    expect(names).toContain("handle")
    expect(names).not.toContain("misnamed")
  })

  test("`required` and `computed` are read off the definition, absent meaning neither", () => {
    expect(LEAF.find((one) => one.name === "domain")).toMatchObject({ required: true, computed: false })
    expect(LEAF.find((one) => one.name === "made-at")).toMatchObject({ required: false, computed: true })
    expect(LEAF.find((one) => one.name === "parent")).toMatchObject({ required: false, computed: false })
  })

  test("a type naming several arms holds where any one of them does", () => {
    const { rule } = ruleFor("relation-id | none", VOCABULARY)
    expect(rule!.holds(ROOT_ID)).toBeNull()
    expect(rule!.holds("none")).toBeNull()
    expect(rule!.holds("neither")).not.toBeNull()
  })

  test("a list arm names its entries' type, which is what a bare name would have been read as", () => {
    expect(namesIn("lower-kebab-case | list(lower-kebab-case, max 5)")).toEqual(["lower-kebab-case", "lower-kebab-case"])
    expect(namesIn("list(text)")).toEqual(["text"])
    expect(namesIn("list(lower-kebab-case")).toEqual(["list(lower-kebab-case"])
  })

  test("a list stating no bound admits what no bounded one would, and an empty one holds nothing", () => {
    const { rule } = ruleFor("list(lower-kebab-case)", VOCABULARY)
    expect(rule!.holds(Array.from({ length: 49 }, (_, at) => `entry-${at}`))).toBeNull()
    expect(rule!.holds([])).toMatchObject({ fault: "held", measured: "an empty list" })
  })
})

describe("which page type a page is judged against", () => {
  const sited = (relPath: string, lines: readonly string[]) =>
    pageTypeChain(relPath, "akasha", fileTreeOf({ ...FILES, [relPath]: block(lines) }))

  test("the page type its name carries claims it, wherever the file sits", () => {
    const { relPaths, why } = sited("elsewhere/odd.leaf.md", ["domain: a-domain"])
    expect(why).toBeNull()
    expect(relPaths).toEqual(["pages/page-type/leaf.page-type.md", "pages/page-type/root.page-type.md"])
  })

  test("a name carrying a slug no page type carries is refused rather than claimed by where it stands", () => {
    const { relPaths, why } = sited("pages/leaf/one.nonsense.md", ["domain: a-domain"])
    expect(relPaths).toBeNull()
    expect(why).toContain("nonsense")
  })

  test("a file in a page type's own directory carrying no page type name is claimed by nothing", () => {
    const { relPaths, why } = sited("pages/leaf/one.md", ["domain: a-domain"])
    expect(relPaths).toBeNull()
    expect(why).toContain("no page type claims it")
  })
})

describe("frontmatter stating exactly what is declared", () => {
  test("is held to every key and refuses none of them", () => {
    const verdict = judged({})
    expect(verdict.why).toBeNull()
    expect(verdict.refusals).toEqual([])
    expect(verdict.keys).toBe(Object.keys(WHOLE).length)
  })

  test("a key whose declared type states no rule is reported rather than judged", () => {
    expect(judged({}).unjudged).toEqual(["`carved`: `granite` is a type this states no rule for"])
    expect(judged({ carved: "still nonsense" }).refusals).toEqual([])
  })

  test("an absent key that is not required refuses nothing", () => {
    expect(judged({ parent: null, id: null }).refusals).toEqual([])
  })
})

describe("the negative controls", () => {
  const CASES: readonly (readonly [string, Record<string, string | null>, string])[] = [
    ["an invented key", { "nonsense-key": "whatever" }, "`nonsense-key` is no property of `leaf`"],
    ["a missing required key", { domain: null }, "`domain` is required on `leaf`"],
    ["a computed key stated in a file", { "made-at": "2026-08-13T09:00:00Z" }, "`made-at` is computed on `root`"],
    ["a slug that is not one", { domain: "Not A Slug" }, "a name in lower kebab case"],
    ["a uuid that is not one", { id: "not-a-uuid" }, "a UUID"],
    ["a relation that is not an id", { "points-at": "nope" }, "the UUID of the page it points at"],
    ["a boolean that is neither", { live: "maybe" }, "`true` or `false`"],
    ["a number that is a word", { rank: "many" }, "a number"],
    ["an instant that is a day", { "seen-at": "2026-08-13" }, "an ISO 8601 instant"],
    ["a url that is a path", { home: "/page" }, "an http or https URL"],
    ["a text that is empty", { label: "" }, "a non-empty value"],
    ["a union matching neither arm", { upward: "neither" }, "the UUID of the page it points at or `none`"],
    ["a path that names no repo", { held: "nowhere" }, "a repo and a glob"],
    ["a type name nothing declares", { type: "nonsense" }, "a type name `page-property-type` claims"],
    ["a union of type names with one bad side", { type: "granite | nonsense" }, "`type: granite | nonsense` is not"],
    ["a type name that is empty", { type: "" }, "a type name `page-property-type` claims"],
  ]

  for (const [name, changes, says] of CASES)
    test(`${name} is refused, and the refusal says why`, () => {
      const verdict = judged(changes)
      expect(verdict.why).toBeNull()
      expect(verdict.refusals.join("\n")).toContain(says)
    })

  test("a scalar type holding a list is refused rather than read as one value", () => {
    const text = block(["domain: a-domain", "parent:", "  - one", "  - two"])
    expect(judgeFrontmatter(text, "leaf", LEAF, VOCABULARY).refusals.join("\n")).toContain("`parent` holds a list")
  })
})

const holding = (lines: readonly string[]) =>
  judgeFrontmatter(block(["domain: a-domain", ...lines]), "leaf", LEAF, VOCABULARY)

describe("a key stating a list of values", () => {
  test("a list inside its bound holds, and so does either arm of a scalar-or-list union", () => {
    expect(holding(["terms:", "  - one", "  - two"]).refusals).toEqual([])
    expect(holding(["parents: one-domain"]).refusals).toEqual([])
    expect(holding(["parents:", "  - one-domain"]).refusals).toEqual([])
  })

  const CASES: readonly (readonly [string, readonly string[], string])[] = [
    [
      "one entry past its bound",
      ["parents:", "  - a", "  - b", "  - c", "  - d", "  - e", "  - f"],
      "`parents` holds a list of 6",
    ],
    ["an entry of the wrong scalar type", ["terms:", "  - one", "  - Not A Slug"], "`Not A Slug` in a list"],
    ["a scalar where only a list is admitted", ["terms: one"], "`terms` holds one value"],
    ["a map where a list is stated", ["terms:", "  one: two"], "`terms` holds a map"],
  ]

  for (const [name, lines, says] of CASES)
    test(`${name} is refused, and the refusal says what stood there`, () => {
      const verdict = holding(lines)
      expect(verdict.why).toBeNull()
      expect(verdict.refusals.join("\n")).toContain(says)
    })

  test("the refusal names the type that was stated as well as what it wanted", () => {
    expect(holding(["terms: one"]).refusals).toEqual([
      "`terms` holds one value where `list(lower-kebab-case, max 20)` states a list of at most 20, each a name in lower kebab case",
    ])
  })

  test("an entry that is no value at all is refused, naming what stood in the list", () => {
    const { rule } = ruleFor("list(lower-kebab-case, max 20)", VOCABULARY)
    expect(rule!.holds([["one"]])).toMatchObject({ measured: "a list in a list" })
    expect(rule!.holds([{ one: "two" }])).toMatchObject({ measured: "a map in a list" })
  })

  test("a list past no bound at all holds, absence of a bound being unbounded", () => {
    expect(holding(["paths:", ...Array.from({ length: 49 }, (_, at) => `  - entry-${at}`)]).refusals).toEqual([])
  })
})

describe("a value naming a page the type vocabulary claims", () => {
  test("every name standing under the glob holds, and so does a union of them", () => {
    for (const name of NAMES) expect(judged({ type: name }).refusals).toEqual([])
    expect(judged({ type: "granite | basalt" }).refusals).toEqual([])
  })

  test("a page standing outside the page type's own slug is no part of its vocabulary", () => {
    const moved = fileTreeOf({
      ...FILES,
      "elsewhere/marble.md": block([`id: ${NAMING_ID}`, "type-slug: marble"]),
    })
    expect(judged({ type: "marble" }, vocabularyIn(moved)).refusals.join("\n")).toContain("`granite`")
    for (const name of NAMES) expect(judged({ type: name }, vocabularyIn(moved)).refusals).toEqual([])
  })
})

describe("a property taking whatever this file's own `type:` names", () => {
  test("the back-reference is not a type name and is never looked up", () => {
    expect(judged({ type: OWN_TYPE }).refusals).toEqual([])
  })

  test("the value it stands for is judged against the type this file names", () => {
    expect(judged({ type: "boolean", fallback: "true" }).refusals).toEqual([])
    expect(judged({ type: "boolean", fallback: "maybe" }).refusals.join("\n")).toContain("`true` or `false`")
  })

  test("a file naming no type of its own is reported rather than refused", () => {
    const verdict = judged({ type: null, fallback: "maybe" })
    expect(verdict.refusals).toEqual([])
    expect(verdict.unjudged.join("\n")).toContain("this file names none")
  })

  test("a file whose own type states no rule is reported rather than refused", () => {
    const verdict = judged({ type: "granite", fallback: "maybe" })
    expect(verdict.refusals).toEqual([])
    expect(verdict.unjudged.join("\n")).toContain("`granite` is a type this states no rule for")
  })
})

describe("what cannot be judged is reported rather than refused", () => {
  test("a page type extending a slug no page type carries states no property set", () => {
    const orphan = fileTreeOf({
      ...FILES,
      "pages/page-type/leaf.page-type.md": block([`id: ${LEAF_ID}`, "extends-slug: nowhere"]),
    })
    const { properties, why } = propertiesFor(typeNamed("leaf", orphan), orphan)
    expect(properties).toBeNull()
    expect(why).toContain("the slug of no page type here")
  })

  test("a page type whose `extends-slug` chain returns to itself states no property set", () => {
    const looped = fileTreeOf({
      ...FILES,
      "pages/page-type/root.page-type.md": block([`id: ${ROOT_ID}`, "extends-slug: leaf"]),
    })
    const { properties, why } = propertiesFor(typeNamed("leaf", looped), looped)
    expect(properties).toBeNull()
    expect(why).toContain("returns to")
  })

  test("a property definition whose frontmatter cannot be read states no property set", () => {
    const broken = fileTreeOf({ ...FILES, "pages/page-property-definition/leaf-domain.page-property-definition.md": "no frontmatter at all\n" })
    expect(propertiesFor(typeNamed("leaf", broken), broken).why).toContain("pages/page-property-definition/leaf-domain.page-property-definition.md")
  })

  test("a body whose own frontmatter cannot be accounted for is reported rather than refused", () => {
    const verdict = judgeFrontmatter("---\ndomain: a-domain\n\tstray\n---\n", "leaf", LEAF, VOCABULARY)
    expect(verdict.refusals).toEqual([])
    expect(verdict.why).toContain("cannot be accounted for")
  })

  const except = (drop: (at: string) => boolean): Readonly<Record<string, string>> =>
    Object.fromEntries(Object.entries(FILES).filter(([at]) => !drop(at)))

  const GONE: readonly (readonly [string, FileTree, string])[] = [
    [
      "no page type names the types",
      fileTreeOf(except((at) => at === "pages/page-type/page-property-type.page-type.md")),
      "no page type named",
    ],
    ["no repo holds the page type's own directory", fileTreeOf(FILES, { leaf: "akasha" }), "claims no files"],
    [
      "the page type's directory stands in a repo this reads none of",
      fileTreeOf(FILES, { ...PLACED, "page-property-type": "code-editor" }),
      "which nothing here reads",
    ],
    [
      "the page type's own directory holds nothing",
      fileTreeOf(except((at) => at.startsWith("pages/page-property-type/"))),
      "nothing stands there",
    ],
  ]

  for (const [name, tree, says] of GONE)
    test(`${name}: a type name is reported rather than refused`, () => {
      const verdict = judged({ type: "nonsense" }, vocabularyIn(tree))
      expect(verdict.refusals).toEqual([])
      expect(verdict.unjudged.join("\n")).toContain(says)
    })
})
