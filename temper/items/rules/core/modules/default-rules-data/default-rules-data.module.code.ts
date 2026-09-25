import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  type ConditionEntry,
  conditionsOf,
} from "akasha/temper/items/rules/core/modules/inventory-rule-from-pages/inventory-rule-from-pages.module.code.ts"
import type {
  CategoryRule,
  ItemAction,
  MoveToDestination,
} from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import {
  RULE_TEMPLATE_CONDITIONS,
  RULE_TEMPLATE_PAGES,
} from "akasha/temper/player/progress/temper-rule-template/modules/rule-template-pages/rule-template-pages.module.code.ts"
import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"
import { z } from "zod"

const CONDITION_ENTRY = z.object({ conditionField: z.string(), conditionValue: z.string() })

function conditionRows(text: string | undefined): readonly ConditionEntry[] {
  if (text === undefined) return []
  return text
    .split("\n")
    .filter((line) => line !== "")
    .map((line) => CONDITION_ENTRY.parse(JSON.parse(line)))
}

function ruleFromTemplate(page: TemperRuleTemplate): CategoryRule {
  const conditions = conditionsOf(conditionRows(RULE_TEMPLATE_CONDITIONS[page.slug]), page.slug)
  return {
    id: page.key,
    title: page.title,
    notes: page.description,
    goal: slugOf(page.goal),
    categoryId: slugOf(page.categoryId),
    action: slugOf(page.action) as ItemAction,
    ...(page.destination === undefined
      ? {}
      : { destination: page.destination as MoveToDestination }),
    ...(page.stockScope === undefined ? {} : { stockScope: page.stockScope }),
    active: page.active,
    ...(conditions === undefined ? {} : { conditions }),
  }
}

export const DEFAULT_RULES: readonly CategoryRule[] = RULE_TEMPLATE_PAGES.map(ruleFromTemplate)
