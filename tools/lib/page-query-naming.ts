import { deriverFor } from "./deriver-hold.ts"
import { type Row } from "./page-derive-shape.ts"
import { listOf, textOf } from "./page-query-values.ts"
import type { Deriver } from "./page-derive-shape.ts"
import { kebabized } from "../../page/property/key-spelling.ts"
import { slugNamed } from "../../page/page-address.ts"
import type { Roots } from "../../page/page.ts"

const POINTS = /\brelation(-(?:slug|seq|id|name|address))?\b/

const FACETS: readonly string[] = ["id", "slug", "seq", "title"]

export interface Naming {
  readonly pageType: string
  readonly key: string
  readonly rows: readonly Row[]
}

function stemOf(at: string): string {
  const path = at.includes(":") ? at.slice(at.indexOf(":") + 1) : at
  const last = path.split("/").at(-1) ?? path
  const dot = last.indexOf(".")
  return dot < 0 ? last : last.slice(0, dot)
}

function facetsIn(rows: readonly Row[], keys: readonly string[], name: string): ReadonlySet<string> {
  const wanted = slugNamed(name)
  const found = new Set<string>([name, wanted])
  const one = rows.find(
    (row) =>
      stemOf(row.at) === wanted ||
      keys.some((key) => {
        const held = textOf(row.values, key)
        return held !== null && (held === name || held === wanted)
      })
  )
  if (one === undefined) return found
  for (const key of keys) {
    const held = textOf(one.values, key)
    if (held !== null) found.add(held)
  }
  found.add(stemOf(one.at))
  return found
}

function namesOf(
  derive: Deriver,
  target: string | null,
  slugProperty: string | null,
  name: string,
  held: Map<string, ReadonlySet<string>>
): ReadonlySet<string> {
  if (target === null) return new Set([name, slugNamed(name)])
  const at = slugProperty === null ? target : `${target} ${slugProperty}`
  const known = held.get(at)
  if (known !== undefined) return known
  const keys = slugProperty === null ? FACETS : [...FACETS, slugProperty]
  const made = facetsIn(derive.rows(target) ?? [], keys, name)
  held.set(at, made)
  return made
}

export function pagesNaming(
  roots: Roots,
  asked: string,
  name: string,
  holders: readonly string[] | null,
  limit: number | null
): readonly Naming[] {
  const derive = deriverFor(roots)
  const key = kebabized(asked)
  const held = new Map<string, ReadonlySet<string>>()
  const found: Naming[] = []
  let taken = 0
  for (const backed of derive.backed()) {
    if (limit !== null && taken >= limit) break
    if (holders !== null && !holders.includes(backed.slug)) continue
    const stated = derive.typeOf(backed.slug, key)
    if (stated === null || !POINTS.test(stated)) continue
    const relation = derive.relations(backed.slug).find((one) => one.key === key)
    const names = namesOf(derive, relation?.target ?? null, relation?.slugProperty ?? null, name, held)
    const kept: Row[] = []
    for (const row of derive.rows(backed.slug) ?? []) {
      if (limit !== null && taken >= limit) break
      if (!listOf(row.values, key).some((one) => names.has(one) || names.has(slugNamed(one)))) continue
      kept.push(row)
      taken += 1
    }
    if (kept.length > 0) found.push({ pageType: backed.slug, key, rows: kept })
  }
  return found
}
