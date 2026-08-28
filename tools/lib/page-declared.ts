import { AKASHA, rootFor } from "../../repo/roots/roots.ts"
import { onceInCall } from "../../during-call/during-call.ts"
import { rootsKey } from "../../page/file-tree.ts"
import { type Frontmatter, listField, textField } from "../../page/frontmatter.ts"
import { slugNamed } from "../../page/page-address.ts"
import { computedOn } from "../../page/property/computed.ts"
import { ATTACHMENT, type Held } from "./page-file-values.ts"
import {
  DEFINED_ON,
  filedIn,
  PAGE_TYPE_GLOBS,
  PAGE_TYPE_KINDS,
  PROPERTY_GLOBS,
  repoPlacings,
  scanIn,
  type Filed,
} from "../../page/page-types.ts"
import { indexReaches, loadPages } from "../../page/index/store/store.ts"
import { blockOf, stringAt, textAt } from "../../page/text/text.ts"
import { stemOf as slugOf } from "../../page/name/name.ts"
import { SLUG_PROPERTY } from "../../page/property/stated.ts"
import type { Roots } from "../../page/page.ts"

export const FROM = "from"

export const BACK = "back-from"

export const TARGET = "target-slug"

export const EXTENDS = "extends-slug"

export const EXPRESSION = "expression"

export const ROWS = "rows"

export const UNCOMMITTED = "uncommitted"

export const FALLBACK = "default"

export const RELATION = "relation"

export const REDUCTION = "function"

export const OVER = "target"

export const NAMED_FOR = "named-for"

export interface Kind {
  readonly filed: readonly Filed[]
  readonly above: string | null
  readonly namedFor: string | null
}

export interface Declared {
  readonly slug: string
  readonly on: string
  readonly key: string
  readonly type: string | null
  readonly target: string | null
  readonly slugProperty: string | null
  readonly from: readonly string[]
  readonly back: string | null
  readonly fallback: Held
  readonly expression: string | null
  readonly relation: string | null
  readonly reduction: string | null
  readonly over: string | null
  readonly attachment: string | null
  readonly rows: string | null
  readonly uncommitted: boolean
  readonly computed: boolean
}

export interface Declarations {
  readonly byKind: ReadonlyMap<string, ReadonlyMap<string, Declared>>
  readonly bySlug: ReadonlyMap<string, Declared>
}

function fallbackIn(fm: Frontmatter, key: string): Held {
  const stated = textField(fm, key)
  if (stated !== null) return stated
  const listed = listField(fm, key)
  return listed.length === 0 ? null : listed
}

// Every page-type and property declaration stands in akasha. They were read out of
// the repository beside it once, and a reader still pointed there finds no page type
// at all, so every query over them answers that nothing carries its pages.
export function declaringRoot(roots: Roots): string {
  return rootFor(roots, AKASHA)
}

/**
 * Every page-type declaration standing in akasha, by the page type each file's name carries.
 *
 * READ OFF THE INDEX RATHER THAN GLOBBED, for the reason `pageTypePaths` records in
 * `page/property/registry.ts`: the globs name `pages/page-type/` and nothing else, so the eleven
 * page types filed beside their own domains — the readout four, the graph seven — were invisible
 * here while the registry saw them, and the two answers to what page types exist disagreed.
 *
 * THE GLOB SCAN STANDS WHERE THE INDEX DOES NOT DESCRIBE THIS ROOT. A tree planted somewhere of
 * its own has no rows, and akasha's own rows read against it would answer for a tree nobody asked
 * about.
 */
function pageTypePathsIn(root: string): readonly string[] {
  if (!indexReaches(AKASHA, root)) return scanIn(root, PAGE_TYPE_GLOBS)
  const found = new Set<string>()
  for (const one of loadPages()) {
    if (one.repo === AKASHA && PAGE_TYPE_KINDS.has(one.type)) found.add(one.key)
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
    for (const relPath of pageTypePathsIn(root)) {
      const text = textAt(root, relPath)
      if (text === null) continue
      const { fm, why } = blockOf(text)
      if (why !== null) continue
      const slug = slugOf(relPath)
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

export function declaredIn(fm: Frontmatter, relPath: string): Declared | null {
  const on = stringAt(fm, DEFINED_ON)
  if (on === null) return null
  const type = stringAt(fm, "type")
  return {
    slug: stringAt(fm, "slug") ?? slugOf(relPath),
    on: slugNamed(on),
    key: stringAt(fm, "key") ?? slugOf(relPath),
    type,
    target: stringAt(fm, TARGET),
    slugProperty: stringAt(fm, SLUG_PROPERTY),
    from: listField(fm, FROM),
    back: stringAt(fm, BACK),
    fallback: fallbackIn(fm, FALLBACK),
    expression: textField(fm, EXPRESSION),
    relation: stringAt(fm, RELATION),
    reduction: stringAt(fm, REDUCTION),
    over: stringAt(fm, OVER),
    attachment: stringAt(fm, ATTACHMENT),
    rows: stringAt(fm, ROWS),
    uncommitted: stringAt(fm, UNCOMMITTED) === "true",
    computed: computedOn(fm),
  }
}

/**
 * Every property declaration standing in akasha, held for one call for the reason `kindsIn` gives:
 * this parses 2,231 files, and a call building several derivers parsed them once for each.
 */
export function declarationsIn(roots: Roots): Declarations {
  return onceInCall(`page-property-declarations:${rootsKey(roots)}`, () => {
    const byKind = new Map<string, Map<string, Declared>>()
    const bySlug = new Map<string, Declared>()
    for (const relPath of scanIn(declaringRoot(roots), PROPERTY_GLOBS)) {
      const text = textAt(declaringRoot(roots), relPath)
      if (text === null) continue
      const { fm, why } = blockOf(text)
      if (why !== null) continue
      const one = declaredIn(fm, relPath)
      if (one === null) continue
      const held = byKind.get(one.on) ?? new Map<string, Declared>()
      if (!held.has(one.key)) held.set(one.key, one)
      if (!bySlug.has(one.slug)) bySlug.set(one.slug, one)
      byKind.set(one.on, held)
    }
    return { byKind, bySlug }
  })
}
