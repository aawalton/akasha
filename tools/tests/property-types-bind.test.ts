import { describe, expect, test } from "bun:test"
import { bindings } from "../audits/property-types-bind.ts"
import type { FileTree } from "../../page/file-tree.ts"
import { OWN_TYPE } from "../../page/property/value.ts"
import { block, fileTreeOf } from "./page-frontmatter-fixture.ts"

const ROOT = "55555555-5555-7555-8555-555555555555"
const NAMING = "66666666-6666-7666-8666-666666666666"

const named = (name: string): string =>
  block([`id: 77777777-7777-7777-8777-77777777777${name.length % 10}`, `type-slug: ${name}`])

const property = (type: string | null): string =>
  block(type === null ? ["defined-on-slug: root"] : ["defined-on-slug: root", `type: ${type}`])

const FILES: Readonly<Record<string, string>> = {
  "pages/page-type/root.page-type.md": block([`id: ${ROOT}`, "extends-slug: none"]),
  "pages/page-type/page-property-type.page-type.md": block([`id: ${NAMING}`, "extends-slug: root"]),
  "pages/page-property-type/boolean.page-property-type.md": named("boolean"),
  "pages/page-property-type/granite.page-property-type.md": named("granite"),
  "pages/page-property-type/basin.page-property-type.md": named("basin"),
  "pages/page-property-type/relation-id.page-property-type.md": named("relation-id"),
  "pages/page-property-type/none.page-property-type.md": named("none"),
  "pages/page-property-definition/root-live.page-property-definition.md": property("boolean"),
  "pages/page-property-definition/root-carved.page-property-definition.md": property("granite"),
  "pages/page-property-definition/root-upward.page-property-definition.md": property("relation-id | none"),
  "pages/page-property-definition/root-wrong.page-property-definition.md": property("basalt"),
  "pages/page-property-definition/root-spelled.page-property-definition.md": property("uuid"),
  "pages/page-property-definition/root-fallback.page-property-definition.md": property(`"${OWN_TYPE}"`),
  "pages/page-property-definition/root-bare.page-property-definition.md": property(null),
}

const FILE_TREE = fileTreeOf(FILES)

const without = (dropped: readonly string[]): FileTree =>
  fileTreeOf(Object.fromEntries(Object.entries(FILES).filter(([at]) => !dropped.includes(at))))

describe("the two states a type name can be in", () => {
  const measured = bindings(FILE_TREE)

  test("a name the vocabulary declares with no rule behind it is its own count, naming what leans on it", () => {
    expect(measured.unbound).toEqual([
      { name: "basin", on: [] },
      { name: "granite", on: ["pages/page-property-definition/root-carved.page-property-definition.md"] },
    ])
  })

  test("a name no file declares is a separate count, naming the property that spelled it", () => {
    expect(measured.undeclared).toEqual([
      { name: "basalt", on: "pages/page-property-definition/root-wrong.page-property-definition.md" },
      { name: "uuid", on: "pages/page-property-definition/root-spelled.page-property-definition.md" },
    ])
  })

  test("neither state holds any member of the other, one repair not being the other", () => {
    const unbound = measured.unbound.map((one) => one.name)
    const undeclared = measured.undeclared.map((one) => one.name)
    expect(unbound.filter((one) => undeclared.includes(one))).toEqual([])
  })

  test("a rule the engine holds does not make a name vocabulary, so `uuid` undeclared is still a typo", () => {
    expect(measured.bound).not.toContain("uuid")
  })

  test("a declared name nothing is typed against is unbound with nothing leaning on it, which is a landed half", () => {
    expect(measured.unbound.find((one) => one.name === "basin")?.on).toEqual([])
  })
})

describe("the population a verdict speaks for", () => {
  const measured = bindings(FILE_TREE)

  test("holds every declared name and every name a property spelled, each once", () => {
    expect(measured.names).toEqual(["basalt", "basin", "boolean", "granite", "none", "relation-id", "uuid"])
  })

  test("every name is in exactly one of the three states", () => {
    expect(measured.bound.length + measured.unbound.length + new Set(measured.undeclared.map((one) => one.name)).size).toBe(
      measured.names.length
    )
  })

  test("counts every property file, whatever state its type left it in", () => {
    expect(measured.properties).toBe(7)
  })

  test(`\`${OWN_TYPE}\` names no type, taking whatever the page it sits on states`, () => {
    expect(measured.names).not.toContain(OWN_TYPE)
  })

  test("a property stating no type is neither state, being a file nothing could be resolved from", () => {
    expect(measured.unread).toEqual([
      { relPath: "pages/page-property-definition/root-bare.page-property-definition.md", why: "it states no `type:`, so nothing says what its values are" },
    ])
  })
})

describe("a file tree this could not read", () => {
  test("a vocabulary claiming an empty folder reports why and names nothing, rather than reading clean", () => {
    const measured = bindings(
      without([
        "pages/page-property-type/boolean.page-property-type.md",
        "pages/page-property-type/granite.page-property-type.md",
        "pages/page-property-type/basin.page-property-type.md",
        "pages/page-property-type/relation-id.page-property-type.md",
        "pages/page-property-type/none.page-property-type.md",
      ])
    )
    expect(measured.why).not.toBeNull()
    expect(measured.names).toEqual([])
    expect(measured.undeclared).toEqual([])
  })

  test("no page type naming the vocabulary is the same refusal, every spelled name being unjudgeable", () => {
    const measured = bindings(without(["pages/page-type/page-property-type.page-type.md"]))
    expect(measured.why).not.toBeNull()
    expect(measured.bound).toEqual([])
  })
})
