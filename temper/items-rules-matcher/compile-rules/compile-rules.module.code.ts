import { compileCategoryRuleToOrdered } from "akasha/temper/items-rules-core/inventory-rule-compiler/inventory-rule-compiler.module.code.ts"
import type { CategoryRule } from "akasha/temper/items-rules-core/inventory-rule-types/inventory-rule-types.module.code.ts"

export const compile = (rules: readonly CategoryRule[]) => rules.map(compileCategoryRuleToOrdered)
