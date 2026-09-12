import type { CategoryRule } from "akasha/temper/items-rules-core/inventory-rule-types/inventory-rule-types.module.code.ts"
import { compileCategoryRuleToOrdered } from "akasha/temper/items-rules-core/modules/inventory-rule-compiler/inventory-rule-compiler.module.code.ts"

export const compile = (rules: readonly CategoryRule[]) => rules.map(compileCategoryRuleToOrdered)
