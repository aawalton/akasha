import { describe, expect, it } from "bun:test"
import { parseFrontmatter } from "../../page/frontmatter.ts"
import { propertiesFor } from "../../page/property/frontmatter.ts"
import { registryOf } from "../../page/property/registry.ts"
import { standingOn } from "../lib/page-standing.ts"
import type { FileTree } from "../../page/file-tree.ts"
import type { Property } from "../../page/property/property.ts"
import { block, fileTreeOf } from "./page-frontmatter-fixture.ts"

const on = (slug: string, key: string, lines: readonly string[]): string =>
  block([`defined-on-slug: ${slug}`, `key: ${key}`, ...lines])

const FILES: Readonly<Record<string, string>> = {
  "pages/page-type/root.page-type.md": block(["extends-slug: none"]),
  "pages/page-type/leaf.page-type.md": block(["extends-slug: root"]),
  "pages/page-property-definition/root-owner.page-property-definition.md": on("root", "owner", ["type: slug", "default: alan"]),
  "pages/page-property-definition/root-made-at.page-property-definition.md": on("root", "made-at", ["type: instant", "computed: true", "default: 2026-01-01T00:00:00Z"]),
  "pages/page-property-definition/leaf-domain.page-property-definition.md": on("leaf", "domain", ["type: slug", "required: true"]),
  "pages/page-property-definition/leaf-live.page-property-definition.md": on("leaf", "live", ["type: boolean", "default: false"]),
  "pages/page-property-definition/leaf-parents.page-property-definition.md": on("leaf", "parents", ["type: list(slug, max 5)", "default:\n  - one\n  - two"]),
  "pages/page-property-definition/leaf-rank.page-property-definition.md": on("leaf", "rank", ["type: number"]),
}

const FILE_TREE: FileTree = fileTreeOf(FILES)

function declaredOn(slug: string): readonly Property[] {
  const type = registryOf(FILE_TREE).find((one) => one.slug === slug)
  if (type === undefined) throw new Error(`no page type named ${slug}`)
  const { properties, why } = propertiesFor(type, FILE_TREE)
  expect(why).toBeNull()
  return properties!
}

const LEAF = declaredOn("leaf")

const standing = (body: string): ReadonlyMap<string, unknown> =>
  new Map(standingOn(parseFrontmatter(body), LEAF).map((one) => [one.name, one.value]))

describe("a page read back with its defaults applied", () => {
  it("takes the default where the file states no such key", () => {
    expect(standing(block(["domain: some-domain"])).get("live")).toBe("false")
  })

  it("keeps what the file states over the default", () => {
    expect(standing(block(["domain: some-domain", "live: true"])).get("live")).toBe("true")
  })

  it("takes a default holding a list", () => {
    expect(standing(block(["domain: some-domain"])).get("parents")).toEqual(["one", "two"])
  })

  it("states nothing for a property with no default", () => {
    expect(standing(block(["domain: some-domain"])).has("rank")).toBe(false)
  })

  it("states nothing for a computed property, whatever it defaults to", () => {
    expect(standing(block(["domain: some-domain"])).has("made-at")).toBe(false)
  })

  it("prints the keys the file declares first, in the order it declares them", () => {
    const named = standingOn(parseFrontmatter(block(["live: true", "domain: some-domain"])), LEAF)
    expect(named.filter((one) => one.stated).map((one) => one.name)).toEqual(["live", "domain"])
  })

  it("marks a defaulted key apart from a stated one", () => {
    const named = standingOn(parseFrontmatter(block(["domain: some-domain"])), LEAF)
    expect(named.find((one) => one.name === "live")?.stated).toBe(false)
    expect(named.find((one) => one.name === "domain")?.stated).toBe(true)
  })

  it("leaves the frontmatter it read untouched, so nothing can write a default back", () => {
    const body = block(["domain: some-domain"])
    const fm = parseFrontmatter(body)
    standingOn(fm, LEAF)
    expect(fm.keys).toEqual(["domain"])
    expect(fm.fields.has("live")).toBe(false)
  })
})
