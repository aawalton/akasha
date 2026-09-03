import type { FileTree } from "@akasha/markdown-pages/file-tree"
import { slugNamed } from "@akasha/markdown-pages/page-address"
import { DEFINED_ON, PROPERTY_GLOBS } from "@akasha/markdown-pages/page-types"
import { answeredWhole } from "@akasha/markdown-pages/property-answer-cache"
import { compiledPageTypeFor } from "@akasha/markdown-pages/property-frontmatter"
import { registryOf } from "@akasha/markdown-pages/property-registry"
import { shapeMarkOf } from "@akasha/markdown-pages/shape-mark"
import { blockOf, stringAt } from "@akasha/markdown-pages/text-at"
import { pageStemOf } from "@akasha/pages-system/markdown-page-name"
import type { Property } from "@akasha/pages-system/markdown-property"

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
