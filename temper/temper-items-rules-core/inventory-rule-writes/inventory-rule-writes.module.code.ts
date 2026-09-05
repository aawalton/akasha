import type {
  ChainEntry,
  ConditionEntry,
  HeldRule,
} from "../inventory-rule-from-pages/inventory-rule-from-pages.module.code.ts"
import { pagesFromRules } from "../inventory-rule-to-pages/inventory-rule-to-pages.module.code.ts"
import type { CategoryRule } from "../inventory-rule-types/inventory-rule-types.module.code.ts"

const CONDITIONS = "conditions"

const CHAIN = "destinationChain"

type Row = ConditionEntry | ChainEntry

export interface RuleWrite {
  readonly slug: string
  readonly values: Record<string, unknown>
}

export interface RuleWrites {
  readonly upserts: readonly RuleWrite[]
  readonly deletes: readonly string[]
}

export function sameRow(one: Row, two: Row | undefined): boolean {
  if (two === undefined) return false
  const held = two as unknown as Record<string, unknown>
  for (const [key, value] of Object.entries(one as unknown as Record<string, unknown>)) {
    if (held[key] !== value) return false
  }
  return true
}

export function sameRows(one: readonly Row[], two: readonly Row[]): boolean {
  if (one.length !== two.length) return false
  return one.every((row, at) => sameRow(row, two[at]))
}

export function valuesFor(wanted: HeldRule, was: HeldRule | undefined): Record<string, unknown> {
  const conditions = wanted.conditions ?? []
  const chain = wanted.chain ?? []
  const values: Record<string, unknown> = { ...wanted.page }
  if (conditions.length > 0 || (was?.conditions ?? []).length > 0) values[CONDITIONS] = conditions
  if (chain.length > 0 || (was?.chain ?? []).length > 0) values[CHAIN] = chain
  return values
}

export function alreadySo(was: HeldRule, values: Record<string, unknown>): boolean {
  const page = was.page as unknown as Record<string, unknown>
  for (const [key, value] of Object.entries(values)) {
    if (key === CONDITIONS) {
      if (!sameRows(value as readonly ConditionEntry[], was.conditions ?? [])) return false
      continue
    }
    if (key === CHAIN) {
      if (!sameRows(value as readonly ChainEntry[], was.chain ?? [])) return false
      continue
    }
    if (page[key] !== value) return false
  }
  return true
}

export function writesFor(
  rules: readonly CategoryRule[],
  held: readonly HeldRule[],
  accountPage: string
): RuleWrites {
  const wanted = pagesFromRules(rules, accountPage)
  const by = new Map(held.map((one) => [one.page.slug, one]))
  const upserts: RuleWrite[] = []
  for (const one of wanted) {
    const was = by.get(one.page.slug)
    const values = valuesFor(one, was)
    if (was !== undefined && alreadySo(was, values)) continue
    upserts.push({ slug: one.page.slug, values })
  }
  const keeping = new Set(wanted.map((one) => one.page.slug))
  const deletes = held.map((one) => one.page.slug).filter((slug) => !keeping.has(slug))
  return { upserts, deletes }
}
