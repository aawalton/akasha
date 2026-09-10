import type { CategoryRule } from "../inventory-rule-types/inventory-rule-types.module.code.ts"
import { TEMPER_RULE_TEMPLATES_01 } from "../rule-template-table-01/rule-template-table-01.module.code.ts"
import { TEMPER_RULE_TEMPLATES_02 } from "../rule-template-table-02/rule-template-table-02.module.code.ts"

export const TEMPER_RULE_TEMPLATES: readonly CategoryRule[] = [
  ...TEMPER_RULE_TEMPLATES_01,
  ...TEMPER_RULE_TEMPLATES_02,
]
