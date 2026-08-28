import { type Carries } from "./page-derive-shape.ts"
import { BODY } from "./page-file-values.ts"
import type { PageQuery } from "./page-query.ts"

export function askedKeys(query: PageQuery): readonly string[] {
  const wanted = new Set<string>(query.keys ?? [])
  if (query.sortBy !== undefined) wanted.add(query.sortBy)
  if (query.target !== undefined) wanted.add(query.target)
  for (const key of query.countBy ?? []) wanted.add(key)
  for (const test of query.where ?? []) wanted.add(test.key)
  return [...wanted].sort()
}

export function carriesFor(query: PageQuery): Carries {
  const keys = query.keys ?? []
  const reduces = query.countBy !== undefined || query.function !== undefined
  const whole = query.keys === undefined && !reduces
  const asked = askedKeys(query)
  return {
    body: asked.includes(BODY) || whole,
    attachment: keys,
    rows: keys,
    ...(whole ? {} : { only: { kind: query.pageType, keys: asked } }),
  }
}
