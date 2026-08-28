import { deriverFor } from "./deriver-hold.ts"
import { type Row } from "./page-derive-shape.ts"
import { textOf } from "./page-query-values.ts"
import type { Deriver } from "./page-derive-shape.ts"
import type { Values } from "./page-file-values"
import { camelizeKey } from "../page/page-naming.ts"
import { idOfFilePage } from "../../page/name/naming/naming"
import { slugNamed } from "../../page/page-address.ts"
import type { Roots } from "../../page/page"

const PAGE_TYPE = "page-type"

const PROPERTY_DEFINITION = "page-property-definition"

const DEFINED_ON = "defined-on-slug"

const OWNER_SLUG = "owner-slug"

const TARGET_SLUG = "target-slug"

const SLUG_PROPERTY = "slug-property"

const MAY_BE_GONE = "may-be-gone"

const EXTENDS = "extends-slug"

const NO_PARENT = "none"

const CHAIN_CEILING = 20

export interface Declaration {
  readonly key: string
  readonly type: string
  readonly title: string
  readonly pageId: string
  readonly on: string
  readonly values: Values[string] | null
  readonly targetSlug: string | null
  readonly slugProperty: string | null
  readonly mayBeGone: boolean
}

export interface Shape {
  readonly pageType: string
  readonly pageTypeId: string
  readonly ownerSlug: string | null
  readonly declarations: readonly Declaration[]
}

interface Stated {
  readonly id: string
  readonly extendsSlug: string | null
  readonly ownerSlug: string | null
}

function beneath(derive: Deriver, above: string): readonly string[] {
  const found: string[] = [above]
  for (const row of derive.rows(PAGE_TYPE) ?? []) {
    const slug = textOf(row.values, "slug")
    if (slug === null || slug === above) continue
    if (textOf(row.values, EXTENDS) === above) found.push(slug)
  }
  return found
}

function statedIn(derive: Deriver): ReadonlyMap<string, Stated> {
  const found = new Map<string, Stated>()
  for (const population of beneath(derive, PAGE_TYPE)) {
    for (const row of derive.rows(population) ?? []) {
      const slug = textOf(row.values, "slug")
      if (slug === null || found.has(slug)) continue
      found.set(slug, {
        id: idOfFilePage(textOf(row.values, "id"), row.at),
        extendsSlug: textOf(row.values, EXTENDS),
        ownerSlug: textOf(row.values, OWNER_SLUG),
      })
    }
  }
  return found
}

function chainFrom(pageTypeSlug: string, stated: ReadonlyMap<string, Stated>): readonly string[] {
  const chain: string[] = []
  let at: string | null = pageTypeSlug
  for (let step = 0; at !== null && at !== NO_PARENT && step < CHAIN_CEILING; step += 1) {
    if (chain.includes(at)) break
    const one = stated.get(at)
    if (one === undefined) break
    chain.push(at)
    at = one.extendsSlug
  }
  return chain
}

function declarationOf(row: Row, on: string): Declaration | null {
  const key = textOf(row.values, "key")
  if (key === null) return null
  const held = row.values.values
  return {
    key,
    type: textOf(row.values, "type") ?? "text",
    title: textOf(row.values, "title") ?? key,
    pageId: textOf(row.values, "id") ?? key,
    on,
    values: held === undefined ? null : held,
    targetSlug: textOf(row.values, TARGET_SLUG),
    slugProperty: textOf(row.values, SLUG_PROPERTY),
    mayBeGone: textOf(row.values, MAY_BE_GONE) === "true",
  }
}

function declaredOn(derive: Deriver, chain: readonly string[]): readonly Declaration[] {
  const rank = new Map(chain.map((slug, at) => [slug, at]))
  const nearest = new Map<string, { readonly at: number; readonly one: Declaration }>()
  for (const population of beneath(derive, PROPERTY_DEFINITION)) {
    for (const row of derive.rows(population) ?? []) {
      const stated = textOf(row.values, DEFINED_ON)
      if (stated === null) continue
      const on = slugNamed(stated)
      const at = rank.get(on)
      if (at === undefined) continue
      const one = declarationOf(row, on)
      if (one === null) continue
      const canonical = camelizeKey(one.key)
      const held = nearest.get(canonical)
      if (held !== undefined && held.at <= at) continue
      nearest.set(canonical, { at, one })
    }
  }
  return [...nearest.values()].sort((a, b) => a.at - b.at).map((held) => held.one)
}

export function shapeOf(roots: Roots, pageTypeSlug: string): Shape | null {
  const derive = deriverFor(roots)
  const stated = statedIn(derive)
  const own = stated.get(pageTypeSlug)
  if (own === undefined) return null
  return {
    pageType: pageTypeSlug,
    pageTypeId: own.id,
    ownerSlug: own.ownerSlug,
    declarations: declaredOn(derive, chainFrom(pageTypeSlug, stated)),
  }
}
