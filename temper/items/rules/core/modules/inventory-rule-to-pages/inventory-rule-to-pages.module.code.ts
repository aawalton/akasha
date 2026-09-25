import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import {
  type ChainEntry,
  type ConditionEntry,
  type HeldRule,
  parseConditionText,
  type RulePage,
} from "akasha/temper/items/rules/core/modules/inventory-rule-from-pages/inventory-rule-from-pages.module.code.ts"
import type { CategoryRule } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"

const SLUG_PREFIX = "rule-"

const ITEM_ACTION = "temper-item-action"

const RULE_GOAL = "temper-rule-goal"

const CONDITION_FIELD = "temper-condition-field"

const ITEM_CATEGORY = "temper-item-category-tree"

function slugOf(key: string): string {
  let out = ""
  for (const letter of key) {
    out += letter >= "A" && letter <= "Z" ? `-${letter.toLowerCase()}` : letter
  }
  return out
}

function readsBackAsItself(text: string): boolean {
  return parseConditionText(text)?.held === text
}

export function spelling(value: unknown): string {
  if (typeof value === "string" && readsBackAsItself(value)) return value
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
    out.push({
      conditionField: namedAs(CONDITION_FIELD, slugOf(key), null),
      conditionValue: spelling(value),
    })
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
    categoryId: namedAs(ITEM_CATEGORY, rule.categoryId, null),
    displayOrder,
    action: namedAs(ITEM_ACTION, rule.action, null),
    active: rule.active !== false,
    updatedAt: instantOf(rule.updatedAt ?? 0),
    ...(rule.title == null ? {} : { title: rule.title }),
    ...(rule.notes == null ? {} : { description: rule.notes }),
    ...(rule.goal == null ? {} : { goal: namedAs(RULE_GOAL, rule.goal, null) }),
    ...(rule.locked === undefined ? {} : { locked: rule.locked }),
    ...(rule.destination === undefined ? {} : { destination: rule.destination }),
    ...(rule.stockScope === undefined ? {} : { stockScope: rule.stockScope }),
    ...(rule.craftShortfall === undefined ? {} : { craftShortfall: rule.craftShortfall }),
  }
  return { page, conditions: conditionsOf(rule), chain: chainOf(rule) }
}

export function refuseTies(pages: readonly RulePage[]): undefined {
  const taken = new Map<string, string>()
  for (const page of pages) {
    const place = JSON.stringify([page.accountPage ?? null, page.displayOrder])
    const other = taken.get(place)
    if (other !== undefined) {
      throw new Error(
        `inventoryRuleToPages: rules \`${other}\` and \`${page.slug}\` of one account both take ` +
          `display order ${page.displayOrder}, so nothing would say which comes first, and ` +
          `neither is written`
      )
    }
    taken.set(place, page.slug)
  }
  return undefined
}

export function pagesFromRules(
  rules: readonly CategoryRule[],
  accountPage: string
): readonly (HeldRule & { readonly page: RulePage & { readonly accountPage: string } })[] {
  const out = rules.map((rule, at) => pageFromRule(rule, accountPage, at))
  refuseTies(out.map((one) => one.page))
  return out
}
