import { compileCategoryRuleToOrdered } from "@akasha/temper-items-rules-core/inventory-rule-compiler"
import type { CategoryRule } from "@akasha/temper-items-rules-core/inventory-rule-types"

export const compile = (rules: readonly CategoryRule[]) => rules.map(compileCategoryRuleToOrdered)
