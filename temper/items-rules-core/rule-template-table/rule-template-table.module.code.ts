import type { CategoryRule } from "akasha/temper/items-rules-core/inventory-rule-types/inventory-rule-types.module.code.ts"
import { TEMPER_RULE_TEMPLATES_01 } from "akasha/temper/items-rules-core/rule-template-table-01/rule-template-table-01.module.code.ts"
import { TEMPER_RULE_TEMPLATES_02 } from "akasha/temper/items-rules-core/rule-template-table-02/rule-template-table-02.module.code.ts"

export const TEMPER_RULE_TEMPLATES: readonly CategoryRule[] = [
  ...TEMPER_RULE_TEMPLATES_01,
  ...TEMPER_RULE_TEMPLATES_02,
]
