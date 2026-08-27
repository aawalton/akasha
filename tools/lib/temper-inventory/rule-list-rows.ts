import type { CategoryRule } from "./game-rule-types.ts"

export type RuleListRow = Record<string, unknown>

function toRow(rule: CategoryRule, controlled: boolean, pos: number | undefined): RuleListRow {
  return {
    pos,
    id: rule.id,
    categoryId: rule.categoryId,
    action: rule.action,
    active: rule.active,
    locked: rule.locked,
    destination: rule.destination,
    controlled,
  }
}

export function buildRuleListRows(
  controlledRules: readonly CategoryRule[],
  userRules: readonly CategoryRule[]
): readonly RuleListRow[] {
  return [
    ...controlledRules.map((r) => toRow(r, true, undefined)),
    ...userRules.map((r, i) => toRow(r, false, i)),
  ]
}
