import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import {
  type ChainEntry,
  type CharacterConditionEntry,
  type ConditionEntry,
  type HeldRule,
  parseConditionText,
  type RulePage,
} from "akasha/temper/items/rules/core/modules/inventory-rule-from-pages/inventory-rule-from-pages.module.code.ts"
import type {
  CategoryRule,
  CharEligibility,
} from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import { skillLines } from "akasha/temper/player/character/skill/line/modules/skill-lines/skill-lines.module.code.ts"
import { COMPARISON_OP_PAGES } from "akasha/temper/player/progress/temper-comparison-op/modules/comparison-op-pages/comparison-op-pages.module.code.ts"

const SLUG_PREFIX = "rule-"

const ITEM_ACTION = "temper-item-action"

const RULE_GOAL = "temper-rule-goal"

const CONDITION_FIELD = "temper-condition-field"

const ITEM_CATEGORY = "temper-item-category-tree"

const CHARACTER_CONDITION_FIELD = "temper-character-condition-field"

const SKILL_LINE = "temper-skill-line"

const COMPARISON_OP = "temper-comparison-op"

const OP_ENDING = "Op"

const KNOWN_SKILL_LINES: ReadonlySet<string> = new Set<string>(skillLines.ids)

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

function comparisonOf(rule: CategoryRule, key: string, value: unknown): string {
  const op = COMPARISON_OP_PAGES.find((one) => one.key === value)
  if (op === undefined) {
    throw new Error(
      `inventoryRuleToPages: rule \`${SLUG_PREFIX}${rule.id}\` compares \`${key}\` by ` +
        `${JSON.stringify(value)}, which no ${COMPARISON_OP} page is, and the rule is not written`
    )
  }
  return namedAs(COMPARISON_OP, op.slug, null)
}

function conditionsOf(rule: CategoryRule): readonly ConditionEntry[] {
  const held = rule.conditions
  if (held === undefined) return []
  const out: ConditionEntry[] = []
  for (const [key, value] of Object.entries(held)) {
    if (value === undefined) continue
    out.push({
      conditionField: namedAs(CONDITION_FIELD, slugOf(key), null),
      conditionValue: key.endsWith(OP_ENDING) ? comparisonOf(rule, key, value) : spelling(value),
    })
  }
  return out
}

function testOf(key: string, value: string): CharacterConditionEntry {
  return {
    characterConditionField: namedAs(CHARACTER_CONDITION_FIELD, slugOf(key), null),
    conditionValue: value,
  }
}

export function characterConditionsOf(
  test: CharEligibility | undefined
): readonly CharacterConditionEntry[] {
  if (test === undefined) return []
  const out: CharacterConditionEntry[] = []
  const lines = test.requiredSkillLines
  if (lines !== undefined) {
    const unknown = lines.skillLineIds.find((id) => !KNOWN_SKILL_LINES.has(id))
    if (unknown !== undefined) {
      throw new Error(
        `inventoryRuleToPages: a leg's skill line test names \`${unknown}\`, which no ` +
          `${SKILL_LINE} page is, and the rule is not written`
      )
    }
    const skillLines = lines.skillLineIds.map((id) => namedAs(SKILL_LINE, id, null))
    out.push({
      ...testOf("requiredSkillLines", lines.mode),
      ...(skillLines.length === 0 ? {} : { skillLines }),
    })
  }
  if (test.requiredCurseState !== undefined) {
    out.push(testOf("requiredCurseState", test.requiredCurseState.state))
  }
  if (test.canLevelMorphs !== undefined) {
    out.push(testOf("canLevelMorphs", test.canLevelMorphs.mode))
  }
  return out
}

function chainOf(rule: CategoryRule): readonly ChainEntry[] {
  const legs = rule.destinationChain
  if (legs === undefined) return []
  return legs.map((leg) => {
    const characterConditions = characterConditionsOf(leg.charEligibility)
    return {
      destination: leg.destination,
      ...(leg.targetQuantity === undefined ? {} : { targetQuantity: leg.targetQuantity }),
      ...(characterConditions.length === 0 ? {} : { characterConditions }),
    }
  })
}

export function pageFromRule(
  rule: CategoryRule,
  accountPage: string,
  displayOrder: number,
  writtenAt: number
): HeldRule & { readonly page: RulePage & { readonly accountPage: string } } {
  if (rule.destination !== undefined && (rule.destinationChain ?? []).length > 0) {
    throw new Error(
      `inventoryRuleToPages: rule \`${SLUG_PREFIX}${rule.id}\` states both a destination and a ` +
        `chain of destinations, so which one sends an item is unsaid, and the rule is not written`
    )
  }
  const page = {
    slug: `${SLUG_PREFIX}${rule.id}`,
    accountPage,
    categoryId: namedAs(ITEM_CATEGORY, rule.categoryId, null),
    displayOrder,
    action: namedAs(ITEM_ACTION, rule.action, null),
    active: rule.active,
    updatedAt: instantOf(rule.updatedAt ?? writtenAt),
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
  accountPage: string,
  writtenAt: number
): readonly (HeldRule & { readonly page: RulePage & { readonly accountPage: string } })[] {
  const out = rules.map((rule, at) => pageFromRule(rule, accountPage, at, writtenAt))
  refuseTies(out.map((one) => one.page))
  return out
}
