import { type Deriver, type Relation } from "./page-derive-shape.ts"
import { type Values } from "./page-file-values.ts"
import { deriverFor } from "./deriver-hold.ts"
import { listOf, textOf } from "./page-query-values.ts"
import { type Roots } from "../../page/page.ts"

export interface Named {
  readonly pageType: string
  readonly name: string
  readonly title: string | null
  readonly at: string | null
}

export interface Whole {
  readonly pageType: string
  readonly name: string
  readonly at: string
  readonly values: Values
  readonly relations: Readonly<Record<string, readonly Named[]>>
}

export function whole(roots: Roots, pageType: string, name: string): Whole | null {
  const derive = deriverFor(roots, { body: true, pages: true })
  const row = derive.one(pageType, name)
  if (row === null) return null
  const relations: Record<string, readonly Named[]> = {}
  for (const relation of derive.relations(pageType)) {
    const named = listOf(row.values, relation.key)
    if (named.length === 0) continue
    relations[relation.key] = named.map((one) => namedFor(derive, relation, one))
  }
  return { pageType, name, at: row.at, values: row.values, relations }
}

function namedFor(derive: Deriver, relation: Relation, name: string): Named {
  const found = derive.one(relation.target, name, relation.slugProperty)
  if (found === null) return { pageType: relation.target, name, title: null, at: null }
  return { pageType: relation.target, name, title: textOf(found.values, "title"), at: found.at }
}
