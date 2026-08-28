import { AKASHA, rootFor } from "../../repo/roots/roots.ts"
import { onceInCall } from "../../during-call/during-call.ts"
import { rootsKey } from "../../page/file-tree.ts"
import type { Held } from "./page-file-values.ts"
import type { Property } from "../../page/property/property.ts"
import type { Held as Declaring } from "../../page/property/stated.ts"
import {
  filedIn,
  PAGE_TYPE_GLOBS,
  PAGE_TYPE_KINDS,
  repoPlacings,
  scanIn,
  type Filed,
} from "../../page/page-types.ts"
import { indexReaches, loadPages } from "../../page/index/store/store.ts"
import { blockOf, stringAt, textAt } from "../../page/text/text.ts"
import { pageStemOf } from "../../page/name/name.ts"
import type { Roots } from "../../page/page.ts"

export const FROM = "from"

export const BACK = "back-from"

export const TARGET = "target-slug"

export const EXTENDS = "extends-slug"

export const EXPRESSION = "expression"

export const ROWS = "rows"

export const RELATION = "relation"

export const REDUCTION = "function"

export const OVER = "target"

export const NAMED_FOR = "named-for"

export interface Kind {
  readonly filed: readonly Filed[]
  readonly above: string | null
  readonly namedFor: string | null
}

export function fallbackOf(one: Property): Held {
  const held: Declaring | null = one.default
  if (typeof held === "string") return held.trim() === "" ? null : held.trim()
  if (!Array.isArray(held)) return null
  const listed = held
    .filter((each): each is string => typeof each === "string")
    .map((each) => each.trim())
  return listed.length === 0 ? null : listed
}

export function declaringRoot(roots: Roots): string {
  return rootFor(roots, AKASHA)
}

function kindPathsIn(
  root: string,
  kinds: ReadonlySet<string>,
  globs: readonly string[]
): readonly string[] {
  if (!indexReaches(AKASHA, root)) return scanIn(root, globs, AKASHA)
  const found = new Set<string>()
  for (const one of loadPages()) {
    if (one.repo === AKASHA && kinds.has(one.type)) found.add(one.key)
  }
  return [...found].sort()
}

export function kindsIn(roots: Roots): ReadonlyMap<string, Kind> {
  return onceInCall(`page-type-kinds:${rootsKey(roots)}`, () => {
    const placed = repoPlacings(roots)
    const root = declaringRoot(roots)
    const kinds = new Map<string, Kind>()
    for (const relPath of kindPathsIn(root, PAGE_TYPE_KINDS, PAGE_TYPE_GLOBS)) {
      const text = textAt(root, relPath)
      if (text === null) continue
      const { fm, why } = blockOf(text)
      if (why !== null) continue
      const slug = pageStemOf(relPath)
      if (kinds.has(slug)) continue
      const stated = filedIn(fm)
      const fallback = placed.get(slug) ?? null
      kinds.set(slug, {
        filed: stated ?? (fallback === null ? [] : [{ repo: fallback, place: null }]),
        above: stringAt(fm, EXTENDS),
        namedFor: stringAt(fm, NAMED_FOR),
      })
    }
    return kinds
  })
}
