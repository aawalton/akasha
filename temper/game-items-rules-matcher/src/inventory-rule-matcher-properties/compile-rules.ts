import { compileCategoryRuleToOrdered } from "@temper/game-items-rules-core/inventory-rule-compiler"
import type { CategoryRule } from "@temper/game-items-rules-core/inventory-rule-types"

export const compile = (rules: readonly CategoryRule[]) => rules.map(compileCategoryRuleToOrdered)
