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

/**
 * What a property's `default:` is worth to a page.
 *
 * A DECLARATION HOLDS A WIDER VALUE THAN A PAGE DOES. `Property.default` is the frontmatter as it
 * parsed, which may nest maps; a value handed back for a page is a string, a list of strings, or
 * nothing. This is the one place that gap is crossed: a string trimmed, an empty one taken as
 * none, a list kept for its strings alone, and anything else taken as none.
 */
export function fallbackOf(one: Property): Held {
  const held: Declaring | null = one.default
  if (typeof held === "string") return held.trim() === "" ? null : held.trim()
  if (!Array.isArray(held)) return null
  const listed = held
    .filter((each): each is string => typeof each === "string")
    .map((each) => each.trim())
  return listed.length === 0 ? null : listed
}

// Every page-type and property declaration stands in akasha. They were read out of
// the repository beside it once, and a reader still pointed there finds no page type
// at all, so every query over them answers that nothing carries its pages.
export function declaringRoot(roots: Roots): string {
  return rootFor(roots, AKASHA)
}

/**
 * Every page of these kinds standing in akasha, by the kind each file's name carries.
 *
 * READ OFF THE INDEX RATHER THAN GLOBBED, for the reason `pageTypePaths` records in
 * `page/property/registry.ts`: the globs name `pages/page-type/` and
 * `pages/page-property-definition/` and nothing else, so the eleven page types filed beside their
 * own domains — the readout four, the graph seven — were invisible here while the registry saw
 * them.
 *
 * NAMING THE REPOSITORY DOES NOT REACH THEM, which is why this asks the index by kind rather than
 * handing it the globs. `scannedFromIndex` does read the index once given a repository, but it
 * matches these same folder-anchored globs against the index keys, so it answers the folder
 * question rather than the kind question and returns the same 2,231 paths the disk walk does.
 *
 * THE GLOB SCAN STANDS WHERE THE INDEX DOES NOT DESCRIBE THIS ROOT. A tree planted somewhere of
 * its own has no rows, and akasha's own rows read against it would answer for a tree nobody asked
 * about.
 */
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

/**
 * Every page type standing in akasha, by the slug its file's name carries.
 *
 * HELD FOR THE LENGTH OF ONE CALL AND NO LONGER. A deriver reads this as it is built, and a call
 * builds one deriver per set of keys asked for, so the editor's domain tree — 45 page types inside
 * one call — parsed all 393 page-type files 45 times. A call is short enough that these files
 * cannot meaningfully change inside one, and nothing is held outside a call, so a page type written
 * between two calls is read fresh by the second: there is no window in which a stale one is
 * answered, and no lifetime to tune.
 *
 * A CALLER THAT WROTE A PAGE TYPE AND THEN READ IT BACK INSIDE ONE CALL would be handed the answer
 * from before its own write. None does — the only writers inside an open call are rows sidecars and
 * uncommitted files, and neither is a page-type or property-definition page — and one that did
 * would read past this hold, the way `readUncommittedNow` stands apart from `readUncommitted`.
 */
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
