import { fallbackOf, OVER, REDUCTION, RELATION, TARGET } from "./page-declared.ts"
import type { Property } from "../../page/property/property.ts"
import type { Held, Values } from "./page-file-values.ts"
import { foundIn } from "./page-derive-index.ts"

export const NUMBER = "number"

const SUM = "sum"

const COUNT = "count"

const REDUCTIONS: readonly string[] = [SUM, COUNT]

export interface Reached {
  readonly kind: string
  readonly at: string
  readonly named: string
  readonly values: Values
}

export interface Reaching {
  readonly declarationFor: (kind: string, key: string) => Property | null
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

function staleCopy(
  one: Property,
  declarationFor: (kind: string, key: string) => Property | null
): string | null {
  const walked = declarationFor(one.on, one.relation ?? "")
  const reaches = walked?.target ?? null
  if (reaches === null) return null
  const held = declarationFor(reaches, one.over ?? "")
  if (held === null || held.type === "" || one.type === "" || held.type === one.type) return null
  return (
    `states \`type: ${one.type}\` and reads \`${OVER}: ${one.over}\` on \`${reaches}\`, which holds ` +
    `\`${held.type}\`, so a reader of this property is told it holds one type and handed another`
  )
}

export function underivable(
  one: Property,
  declarationFor: (kind: string, key: string) => Property | null
): string | null {
  if (one.relation === null) {
    if (one.reduction === null) return null
    return `states \`${REDUCTION}\` and no \`${RELATION}\`, so nothing says which pages it reduces`
  }
  if (one.reduction === null) {
    if (one.over === null) {
      return `states \`${RELATION}\` and no \`${OVER}\`, so nothing says which property it reads on each page it reaches`
    }
    return staleCopy(one, declarationFor)
  }
  if (!REDUCTIONS.includes(one.reduction)) {
    return `states \`${REDUCTION}: ${one.reduction}\`, and this deriver reduces by ${REDUCTIONS.join(" or ")} and nothing else`
  }
  if (one.reduction === SUM && one.over === null) {
    return `states \`${REDUCTION}: ${SUM}\` and no \`${OVER}\`, so nothing says which property it adds up`
  }
  return null
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
  declaration: Property,
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
  for (const one of listing(reach.valueOf(page, relation.name, depth + 1))) {
    const next = foundIn(index, one)
    if (next !== undefined) found.push(next)
  }
  return found
}

export function reducedFrom(
  page: Reached,
  declaration: Property,
  depth: number,
  reach: Reaching
): Held {
  const at = `${page.at}#${declaration.name}`
  if (reach.walking.has(at) || depth >= reach.bound) return null
  reach.walking.add(at)
  try {
    const reached = reachedFrom(page, declaration, depth, reach)
    const over = declaration.over ?? ""
    if (declaration.reduction === null) {
      for (const one of reached) {
        const held = reach.valueOf(one, over, depth + 1)
        if (held !== null) return held
      }
      return fallbackOf(declaration)
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
    return seen === 0 ? fallbackOf(declaration) : String(total)
  } finally {
    reach.walking.delete(at)
  }
}
