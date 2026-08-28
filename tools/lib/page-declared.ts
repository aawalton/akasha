import { AKASHA, rootFor } from "../../repo/roots/roots.ts"
import { type Frontmatter, listField, textField } from "../../page/frontmatter.ts"
import { slugNamed } from "../../page/page-address.ts"
import { computedOn, reachedFor, reachingIn } from "../../page/property/computed.ts"
import { ATTACHMENT, type Held } from "./page-file-values.ts"
import { DEFINED_ON, filedIn, PAGE_PROPERTY_TYPE_GLOB, PAGE_TYPE_GLOBS, PROPERTY_GLOBS, repoPlacings, scanIn, type Filed } from "../../page/page-types.ts"
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

export const AGGREGATE = "aggregate"

export const ROLLUP = "rollup"

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
  readonly reaches: boolean
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

export function kindsIn(roots: Roots): ReadonlyMap<string, Kind> {
  const placed = repoPlacings(roots)
  const kinds = new Map<string, Kind>()
  for (const relPath of scanIn(declaringRoot(roots), PAGE_TYPE_GLOBS)) {
    const text = textAt(declaringRoot(roots), relPath)
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
}

export function reachingFor(roots: Roots): ReadonlySet<string> {
  return reachingIn(scanIn(declaringRoot(roots), [PAGE_PROPERTY_TYPE_GLOB]), (relPath) =>
    textAt(declaringRoot(roots), relPath)
  )
}

export function declaredIn(
  fm: Frontmatter,
  relPath: string,
  reaching: ReadonlySet<string>
): Declared | null {
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
    computed: computedOn(fm, reaching),
    reaches: reachedFor(type, reaching),
  }
}

export function declarationsIn(roots: Roots): Declarations {
  const byKind = new Map<string, Map<string, Declared>>()
  const bySlug = new Map<string, Declared>()
  const reaching = reachingFor(roots)
  for (const relPath of scanIn(declaringRoot(roots), PROPERTY_GLOBS)) {
    const text = textAt(declaringRoot(roots), relPath)
    if (text === null) continue
    const { fm, why } = blockOf(text)
    if (why !== null) continue
    const one = declaredIn(fm, relPath, reaching)
    if (one === null) continue
    const held = byKind.get(one.on) ?? new Map<string, Declared>()
    if (!held.has(one.key)) held.set(one.key, one)
    if (!bySlug.has(one.slug)) bySlug.set(one.slug, one)
    byKind.set(one.on, held)
  }
  return { byKind, bySlug }
}
