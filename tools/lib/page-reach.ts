import {
  AGGREGATE,
  type Declared,
  OVER,
  REDUCTION,
  RELATION,
  ROLLUP,
  TARGET,
} from "./page-declared.ts"
import type { Held, Values } from "./page-file-values.ts"
import { foundIn } from "./page-derive-index.ts"

export const NUMBER = "number"

const SUM = "sum"

const COUNT = "count"

const REDUCTIONS: readonly string[] = [SUM, COUNT]

export const WALKS: readonly string[] = [AGGREGATE, ROLLUP]

export interface Reached {
  readonly kind: string
  readonly at: string
  readonly named: string
  readonly values: Values
}

export interface Reaching {
  readonly declarationFor: (kind: string, key: string) => Declared | null
  readonly indexFor: (target: string, slugProperty: string | null) => ReadonlyMap<string, Reached>
  readonly valueOf: (page: Reached, key: string, depth: number) => Held
  readonly fault: (why: string) => void
  readonly walking: Set<string>
  readonly bound: number
}

export function listing(held: Held): readonly string[] {
  if (typeof held === "string") return held.trim() === "" ? [] : [held.trim()]
  return Array.isArray(held) ? held : []
}

export function underivable(one: Declared): string | null {
  if (one.reaches && !WALKS.includes(one.type ?? "")) {
    return (
      `states \`type: ${one.type}\`, which the vocabulary marks as reached for, and this deriver reaches ` +
      `a value for ${WALKS.join(", ")} and no other type`
    )
  }
  if (one.type === AGGREGATE) {
    if (one.relation === null) {
      return `states \`type: ${AGGREGATE}\` and no \`${RELATION}\`, so nothing says which pages it reduces`
    }
    if (one.reduction === null) {
      return `states \`type: ${AGGREGATE}\` and no \`${REDUCTION}\`, so nothing says how it reduces them`
    }
    if (!REDUCTIONS.includes(one.reduction)) {
      return `states \`${REDUCTION}: ${one.reduction}\`, and this deriver reduces by ${REDUCTIONS.join(" or ")} and nothing else`
    }
    if (one.reduction === SUM && one.over === null) {
      return `states \`${REDUCTION}: ${SUM}\` and no \`${OVER}\`, so nothing says which property it adds up`
    }
    return null
  }
  if (one.type === ROLLUP) {
    if (one.relation === null) {
      return `states \`type: ${ROLLUP}\` and no \`${RELATION}\`, so nothing says which page it reads from`
    }
    if (one.over === null) {
      return `states \`type: ${ROLLUP}\` and no \`${OVER}\`, so nothing says which property it reads`
    }
    return null
  }
  if (one.relation === null && one.reduction === null) return null
  const stated = one.relation === null ? REDUCTION : RELATION
  return (
    `states \`${stated}\` under \`type: ${one.type ?? "nothing"}\`, and this deriver walks a relation ` +
    `for ${WALKS.join(" and ")} and no other type, so nothing ever works this property out`
  )
}

export function along(
  page: Reached,
  segments: readonly string[],
  depth: number,
  reach: Reaching
): Held {
  const [first, ...rest] = segments
  if (first === undefined) return null
  const held = reach.valueOf(page, first, depth)
  if (rest.length === 0) return held
  const declaration = reach.declarationFor(page.kind, first)
  const target = declaration?.target ?? null
  if (target === null) {
    reach.fault(`\`${first}\` on \`${page.kind}\` names no \`${TARGET}\`, so a path cannot be walked past it`)
    return null
  }
  const index = reach.indexFor(target, declaration?.slugProperty ?? null)
  for (const named of listing(held)) {
    const next = foundIn(index, named)
    if (next === undefined) continue
    const answer = along(next, rest, depth + 1, reach)
    if (answer !== null) return answer
  }
  return null
}

function reachedFrom(
  page: Reached,
  declaration: Declared,
  depth: number,
  reach: Reaching
): readonly Reached[] {
  const named = declaration.relation ?? ""
  const relation = reach.declarationFor(page.kind, named)
  if (relation === null) {
    reach.fault(
      `\`${declaration.slug}\` states \`${RELATION}: ${named}\`, which is declared by no property on \`${page.kind}\``
    )
    return []
  }
  if (relation.target === null) {
    reach.fault(
      `\`${declaration.slug}\` states \`${RELATION}: ${named}\`, which names no \`${TARGET}\`, so nothing says what pages it reaches`
    )
    return []
  }
  const index = reach.indexFor(relation.target, relation.slugProperty)
  const found: Reached[] = []
  for (const one of listing(reach.valueOf(page, relation.key, depth + 1))) {
    const next = foundIn(index, one)
    if (next !== undefined) found.push(next)
  }
  return found
}

export function reducedFrom(
  page: Reached,
  declaration: Declared,
  depth: number,
  reach: Reaching
): Held {
  const at = `${page.at}#${declaration.key}`
  if (reach.walking.has(at) || depth >= reach.bound) return null
  reach.walking.add(at)
  try {
    const reached = reachedFrom(page, declaration, depth, reach)
    const over = declaration.over ?? ""
    if (declaration.type === ROLLUP) {
      for (const one of reached) {
        const held = reach.valueOf(one, over, depth + 1)
        if (held !== null) return held
      }
      return declaration.fallback
    }
    if (declaration.reduction === COUNT) return String(reached.length)
    let total = 0
    let seen = 0
    for (const one of reached) {
      const held = reach.valueOf(one, over, depth + 1)
      if (typeof held !== "string" || held.trim() === "") continue
      const value = Number(held)
      if (!Number.isFinite(value)) continue
      total += value
      seen += 1
    }
    return seen === 0 ? declaration.fallback : String(total)
  } finally {
    reach.walking.delete(at)
  }
}
