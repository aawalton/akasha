import { BODY } from "@akasha/pages-system/page-value-key"
import type { FileTree } from "../../page/file-tree.ts"
import { compiledPageTypeFor } from "../../page/property/frontmatter.ts"
import type { Property } from "../../page/property/property.ts"
import { registryOf } from "../../page/property/registry.ts"

export { BODY }

export const TEMPLATE = "template"

export const PAGES = "pages"

export const JSONL = "jsonl"

export type Rendered = string | number | boolean | readonly (string | number | boolean)[]

type Stated = string | number | boolean | readonly string[]

export function declarationsFor(tree: FileTree, pageType: string): ReadonlyMap<string, Property> {
  const type = registryOf(tree).find((one) => one.slug === pageType)
  if (type === undefined) return new Map()
  const { chain, properties } = compiledPageTypeFor(type, tree)
  if (chain === null || properties === null) return new Map()
  const rank = new Map(chain.map((slug, at) => [slug, at]))
  const found = new Map<string, Property>()
  const nearest = new Map<string, number>()
  for (const one of properties) {
    const at = rank.get(one.on)
    if (at === undefined) continue
    const held = nearest.get(one.name)
    if (held !== undefined && held <= at) continue
    nearest.set(one.name, at)
    found.set(one.name, one)
  }
  return found
}

export function typesFor(tree: FileTree, pageType: string): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const [key, stated] of declarationsFor(tree, pageType)) {
    if (stated.type !== "") found.set(key, stated.type)
  }
  return found
}

export function defaultsFor(tree: FileTree, pageType: string): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const [key, stated] of declarationsFor(tree, pageType)) {
    const held = stated.default
    if (typeof held === "string" && held.trim() !== "") found.set(key, held.trim())
  }
  return found
}

export interface RowsHolding {
  readonly key: string
  readonly target: string | null
  readonly uncommitted: boolean
}

export function rowsHoldingsFor(tree: FileTree, pageType: string): readonly RowsHolding[] {
  const found: RowsHolding[] = []
  for (const [key, stated] of declarationsFor(tree, pageType)) {
    if (stated.type === PAGES && stated.rows === JSONL) {
      found.push({ key, target: stated.target, uncommitted: stated.uncommitted })
    }
  }
  return found
}

export function bodyKeyFor(tree: FileTree, pageType: string): string | null {
  const stated = declarationsFor(tree, pageType).get(BODY)?.type
  return stated === undefined || stated === "" || stated.trim() === TEMPLATE ? BODY : null
}

const INNER = String.raw`[a-z][a-z0-9-]*(?:\([^()]*\))?`
const BOUND = String.raw`(?:,\s*max\s+[1-9]\d*\s*)?`
const LIST_OF = new RegExp(String.raw`^list\(\s*(${INNER})\s*${BOUND}\)$`)
const SELECT_OF = new RegExp(String.raw`^select\(\s*(${INNER})\s*\)$`)

function scalarAs(one: string | number | boolean, type: string): string | number | boolean {
  const stated = type.trim()
  const chosen = SELECT_OF.exec(stated)?.[1]
  if (chosen !== undefined) return scalarAs(one, chosen)
  if (stated === "number") {
    if (typeof one !== "string" || one.trim() === "") return one
    const n = Number(one)
    return Number.isFinite(n) ? n : one
  }
  if (stated === "boolean") {
    if (one === "true") return true
    if (one === "false") return false
    return one
  }
  return one
}

export function asDeclared(value: Stated, type: string | undefined): Rendered {
  if (type === undefined) return value
  const listed = LIST_OF.exec(type.trim())?.[1]
  if (listed !== undefined) {
    return Array.isArray(value) ? value.map((one) => scalarAs(one, listed)) : value
  }
  return Array.isArray(value) ? value : scalarAs(value as string | number | boolean, type)
}

function sameAs(one: Rendered, other: Rendered): boolean {
  if (Array.isArray(one) || Array.isArray(other)) {
    if (!Array.isArray(one) || !Array.isArray(other)) return false
    return one.length === other.length && one.every((each, at) => each === other[at])
  }
  return one === other
}

export function withoutDefaults(
  tree: FileTree,
  pageType: string,
  values: Readonly<Record<string, Rendered>>
): Record<string, Rendered> {
  const defaults = defaultsFor(tree, pageType)
  const types = typesFor(tree, pageType)
  const kept: Record<string, Rendered> = {}
  for (const [key, value] of Object.entries(values)) {
    const stated = defaults.get(key)
    if (stated !== undefined && sameAs(value, asDeclared(stated, types.get(key)))) continue
    kept[key] = value
  }
  return kept
}
