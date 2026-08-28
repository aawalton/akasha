import { answeredWhole } from "../../page/property/answer-cache.ts"
import { slugNamed } from "../../page/page-address.ts"
import { shapeMarkOf } from "../../page/shape/mark.ts"
import { DEFINED_ON } from "../../page/page-types.ts"
import { blockOf, stringAt } from "../../page/text/text.ts"
import { pageStemOf } from "../../page/name/name.ts"
import type { FileTree } from "../../page/file-tree.ts"
import { compiledPageTypeFor } from "../../page/property/frontmatter.ts"
import type { Property } from "../../page/property/property.ts"
import { registryOf } from "../../page/property/registry.ts"

import { PROPERTY_GLOBS } from "../../page/page-types.ts"

export const PAGES = "pages"

export const JSONL = "jsonl"

const UNCOMMITTED = "uncommitted"

const APPEND_ONLY = "append-only"

export interface RowsHome {
  readonly target: string
  readonly parentType: string
  readonly key: string
  readonly uncommitted: boolean
  readonly appendOnly: boolean
}

function homeIn(relPath: string, text: string): RowsHome | null {
  const { fm, why } = blockOf(text)
  if (why !== null) return null
  if (stringAt(fm, "type") !== PAGES || stringAt(fm, "rows") !== JSONL) return null
  const target = stringAt(fm, "target-slug")
  const on = stringAt(fm, DEFINED_ON)
  if (target === null || on === null) return null
  return {
    parentType: slugNamed(on),
    key: stringAt(fm, "key") ?? pageStemOf(relPath),
    uncommitted: stringAt(fm, UNCOMMITTED) === "true",
    appendOnly: stringAt(fm, APPEND_ONLY) === "true",
    target,
  }
}

function homesIn(tree: FileTree): ReadonlyMap<string, readonly RowsHome[]> {
  const said: RowsHome[] = []
  for (const relPath of tree.paths(PROPERTY_GLOBS)) {
    const text = tree.open(relPath)
    const one = text === null ? null : homeIn(relPath, text)
    if (one !== null) said.push(one)
  }
  const homes = new Map<string, RowsHome[]>()
  for (const one of said) {
    const standing = homes.get(one.target)
    if (standing === undefined) homes.set(one.target, [one])
    else standing.push(one)
  }
  return homes
}

const declared = new WeakMap<FileTree, Map<string, readonly Property[] | null>>()

export function declaredFor(tree: FileTree, pageType: string): readonly Property[] | null {
  const byType = declared.get(tree) ?? new Map<string, readonly Property[] | null>()
  declared.set(tree, byType)
  const found = byType.get(pageType)
  if (found !== undefined) return found
  const type = registryOf(tree).find((one) => one.slug === pageType)
  const got = type === undefined ? null : compiledPageTypeFor(type, tree).properties
  const set = got === null || got.length === 0 ? null : got
  byType.set(pageType, set)
  return set
}

type HomesData = readonly (readonly [string, readonly RowsHome[]])[]

const asHomesData = (one: ReadonlyMap<string, readonly RowsHome[]>): HomesData => [...one]

const fromHomesData = (one: HomesData): ReadonlyMap<string, readonly RowsHome[]> => new Map(one)

function heldHomes(tree: FileTree): ReadonlyMap<string, readonly RowsHome[]> {
  const mark = shapeMarkOf(tree)
  const root = tree.root
  const make = (): ReadonlyMap<string, readonly RowsHome[]> => homesIn(tree)
  if (mark === null || root === undefined) return make()
  return answeredWhole(root, mark, "rows-homes", make, asHomesData, fromHomesData)
}

const homes = new WeakMap<FileTree, ReadonlyMap<string, readonly RowsHome[]>>()

function homesOf(tree: FileTree): ReadonlyMap<string, readonly RowsHome[]> {
  const standing = homes.get(tree)
  if (standing !== undefined) return standing
  const made = heldHomes(tree)
  homes.set(tree, made)
  return made
}

export function rowsHomesFor(tree: FileTree, pageType: string): readonly RowsHome[] {
  return homesOf(tree).get(pageType) ?? []
}
