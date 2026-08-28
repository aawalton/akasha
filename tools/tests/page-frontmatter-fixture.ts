import { expect } from "bun:test"
import { propertiesFor, vocabularyOf } from "../../page/property/frontmatter.ts"
import { registryOf } from "../../page/property/registry.ts"
import { OWN_TYPE } from "../../page/property/value.ts"
import type { FileTree } from "../../page/file-tree.ts"
import type { Property } from "../../page/property/property.ts"
import type { Vocabulary } from "../../page/property/stated.ts"
import type { PageType } from "../../page/page-types.ts"

export const ROOT_ID = "11111111-1111-7111-8111-111111111111"
export const LEAF_ID = "22222222-2222-7222-8222-222222222222"
export const NAMING_ID = "44444444-4444-7444-8444-444444444444"

export const block = (lines: readonly string[]): string => `---\n${lines.join("\n")}\n---\n`

const on = (slug: string, key: string, lines: readonly string[]): string =>
  block([`defined-on-slug: ${slug}`, `key: ${key}`, ...lines])

export const NAMES = ["basalt", "boolean", "granite"] as const

const KINDS: Readonly<Record<string, string>> = Object.fromEntries(
  NAMES.map((name, at) => [
    `pages/page-property-type/${name}.page-property-type.md`,
    block([`id: 44444444-4444-7444-8444-44444444444${at}`, `type-slug: ${name}`]),
  ])
)

export const FILES: Readonly<Record<string, string>> = {
  "pages/page-type/root.page-type.md": block([`id: ${ROOT_ID}`, "extends-slug: none"]),
  "pages/page-type/leaf.page-type.md": block([`id: ${LEAF_ID}`, "extends-slug: root"]),
  "pages/page-type/page-property-type.page-type.md": block([`id: ${NAMING_ID}`, "extends-slug: root"]),
  ...KINDS,
  "pages/page-property-definition/root-id.page-property-definition.md": on("root", "id", ["type: uuid"]),
  "pages/page-property-definition/root-made-at.page-property-definition.md": on("root", "made-at", ["type: instant", "computed: true"]),
  "pages/page-property-definition/leaf-domain.page-property-definition.md": on("leaf", "domain", ["type: lower-kebab-case", "required: true"]),
  "pages/page-property-definition/leaf-parent.page-property-definition.md": on("leaf", "parent", ["type: lower-kebab-case"]),
  "pages/page-property-definition/leaf-rank.page-property-definition.md": on("leaf", "rank", ["type: number"]),
  "pages/page-property-definition/leaf-live.page-property-definition.md": on("leaf", "live", ["type: boolean"]),
  "pages/page-property-definition/leaf-home.page-property-definition.md": on("leaf", "home", ["type: url"]),
  "pages/page-property-definition/leaf-label.page-property-definition.md": on("leaf", "label", ["type: text"]),
  "pages/page-property-definition/leaf-seen-at.page-property-definition.md": on("leaf", "seen-at", ["type: instant"]),
  "pages/page-property-definition/leaf-points-at.page-property-definition.md": on("leaf", "points-at", ["type: relation-id"]),
  "pages/page-property-definition/leaf-upward.page-property-definition.md": on("leaf", "upward", ["type: relation-id | none"]),
  "pages/page-property-definition/leaf-held.page-property-definition.md": on("leaf", "held", ["type: path | none"]),
  "pages/page-property-definition/leaf-shape.page-property-definition.md": on("leaf", "shape", ["type: map(text)"]),
  "pages/page-property-definition/leaf-carved.page-property-definition.md": on("leaf", "carved", ["type: granite"]),
  "pages/page-property-definition/leaf-parents.page-property-definition.md": on("leaf", "parents", ["type: lower-kebab-case | list(lower-kebab-case, max 5)"]),
  "pages/page-property-definition/leaf-terms.page-property-definition.md": on("leaf", "terms", ["type: list(lower-kebab-case, max 20)"]),
  "pages/page-property-definition/leaf-paths.page-property-definition.md": on("leaf", "paths", ["type: list(text)"]),
  "pages/page-property-definition/leaf-type.page-property-definition.md": on("leaf", "type", ["type: type"]),
  "pages/page-property-definition/leaf-fallback.page-property-definition.md": on("leaf", "fallback", [`type: "${OWN_TYPE}"`]),
}

export const under = (prefix: string): readonly string[] =>
  Object.keys(FILES)
    .filter((at) => at.startsWith(prefix))
    .sort()

export const nameOf = (relPath: string): string => {
  const stem = (relPath.split("/").pop() ?? "").split(".")[0] ?? ""
  return stem.slice(stem.indexOf("-") + 1)
}

export const PLACED: Readonly<Record<string, string>> = { leaf: "akasha", "page-property-type": "akasha" }

export function fileTreeOf(
  files: Readonly<Record<string, string>>,
  placed: Readonly<Record<string, string>> = PLACED
): FileTree {
  return {
    paths: (glob) => {
      const patterns = (typeof glob === "string" ? [glob] : glob).map((one) => new Bun.Glob(one))
      return Object.keys(files)
        .filter((at) => patterns.some((one) => one.match(at)))
        .sort()
    },
    open: (relPath) => files[relPath] ?? null,
    repoOf: (slug) => placed[slug] ?? null,
    pending: new Set(Object.keys(files)),
  }
}

export const FILE_TREE = fileTreeOf(FILES)

export const vocabularyIn = (tree: FileTree): Vocabulary => vocabularyOf(registryOf(tree), tree)

export const VOCABULARY = vocabularyIn(FILE_TREE)

export function typeNamed(slug: string, tree: FileTree = FILE_TREE): PageType {
  const found = registryOf(tree).find((one) => one.slug === slug)
  if (found === undefined) throw new Error(`no page type named ${slug} stands in this file tree`)
  return found
}

export function declaredOn(slug: string, tree: FileTree = FILE_TREE): readonly Property[] {
  const { properties, why } = propertiesFor(typeNamed(slug, tree), tree)
  expect(why).toBeNull()
  return properties!
}

export const LEAF = declaredOn("leaf")

export const WHOLE: Readonly<Record<string, string>> = {
  id: "33333333-3333-7333-8333-333333333333",
  domain: "some-domain",
  parent: "another-domain",
  rank: "4",
  live: "true",
  home: "https://example.test/page",
  label: "a label",
  "seen-at": "2026-08-13T09:00:00Z",
  "points-at": ROOT_ID,
  upward: "none",
  held: "akasha:leaves/*.md",
  carved: "whatever this states",
  parents: "one-domain",
  type: "boolean",
  fallback: "true",
}

export function stating(changes: Readonly<Record<string, string | null>>): string {
  const merged: Record<string, string> = { ...WHOLE }
  for (const [key, value] of Object.entries(changes)) {
    if (value === null) delete merged[key]
    else merged[key] = value
  }
  return block(Object.entries(merged).map(([key, value]) => `${key}: ${value}`))
}
