import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { asking } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import type { CategoryRule } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import {
  holdRuleTemplates,
  ruleTemplatesFrom,
} from "akasha/temper/player/progress/temper-rule-template/modules/rule-template-catalog/rule-template-catalog.module.code.ts"
import { temperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.ts"

export function holdRuleTemplatesFromCheckout(): readonly CategoryRule[] {
  const asked = asking(akashaRoot(), { pageTypeSlug: temperRuleTemplate.slug })
  if ("refused" in asked) throw new Error(asked.refused)
  return holdRuleTemplates(ruleTemplatesFrom(asked.rows as readonly Record<string, unknown>[]))
}
