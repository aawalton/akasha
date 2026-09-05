import type {
  ChainEntry,
  ConditionEntry,
  HeldRule,
  RulePage,
} from "../inventory-rule-from-pages/inventory-rule-from-pages.module.code.ts"
import type { CategoryRule } from "../inventory-rule-types/inventory-rule-types.module.code.ts"

const SLUG_PREFIX = "rule-"

function slugOf(key: string): string {
  let out = ""
  for (const letter of key) {
    out += letter >= "A" && letter <= "Z" ? `-${letter.toLowerCase()}` : letter
  }
  return out
}

function parses(text: string): boolean {
  try {
    JSON.parse(text)
    return true
  } catch {
    return false
  }
}

export function spelling(value: unknown): string {
  if (typeof value === "string" && !parses(value)) return value
  return JSON.stringify(value)
}

export function instantOf(at: number): string {
  return new Date(at).toISOString()
}

function conditionsOf(rule: CategoryRule): readonly ConditionEntry[] {
  const held = rule.conditions
  if (held === undefined) return []
  const out: ConditionEntry[] = []
  for (const [key, value] of Object.entries(held)) {
    if (value === undefined) continue
    out.push({ conditionField: slugOf(key), conditionValue: spelling(value) })
  }
  return out
}

function chainOf(rule: CategoryRule): readonly ChainEntry[] {
  const legs = rule.destinationChain
  if (legs === undefined) return []
  return legs.map((leg) => ({
    destination: leg.destination,
    ...(leg.targetQuantity === undefined ? {} : { targetQuantity: leg.targetQuantity }),
    ...(leg.charEligibility === undefined
      ? {}
      : { charEligibility: JSON.stringify(leg.charEligibility) }),
  }))
}

export function pageFromRule(
  rule: CategoryRule,
  accountPage: string,
  displayOrder: number
): HeldRule & { readonly page: RulePage & { readonly accountPage: string } } {
  const page = {
    slug: `${SLUG_PREFIX}${rule.id}`,
    accountPage,
    categoryId: rule.categoryId,
    displayOrder,
    action: rule.action,
    active: rule.active !== false,
    updatedAt: instantOf(rule.updatedAt ?? 0),
    ...(rule.title == null ? {} : { title: rule.title }),
    ...(rule.notes == null ? {} : { description: rule.notes }),
    ...(rule.goal == null ? {} : { goal: rule.goal }),
    ...(rule.locked === undefined ? {} : { locked: rule.locked }),
    ...(rule.destination === undefined ? {} : { destination: rule.destination }),
    ...(rule.stockScope === undefined ? {} : { stockScope: rule.stockScope }),
  }
  return { page, conditions: conditionsOf(rule), chain: chainOf(rule) }
}

export function pagesFromRules(
  rules: readonly CategoryRule[],
  accountPage: string
): readonly (HeldRule & { readonly page: RulePage & { readonly accountPage: string } })[] {
  return rules.map((rule, at) => pageFromRule(rule, accountPage, at))
}
