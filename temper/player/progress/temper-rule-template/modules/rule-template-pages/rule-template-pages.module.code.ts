import {
  RULE_TEMPLATE_CONDITIONS_1,
  RULE_TEMPLATE_PAGES_1,
} from "akasha/temper/player/progress/temper-rule-template/modules/rule-template-pages-1/rule-template-pages-1.module.code.ts"
import {
  RULE_TEMPLATE_CONDITIONS_2,
  RULE_TEMPLATE_PAGES_2,
} from "akasha/temper/player/progress/temper-rule-template/modules/rule-template-pages-2/rule-template-pages-2.module.code.ts"
import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const RULE_TEMPLATE_PAGES: readonly TemperRuleTemplate[] = [
  ...RULE_TEMPLATE_PAGES_1,
  ...RULE_TEMPLATE_PAGES_2,
].sort((a, b) => a.displayOrder - b.displayOrder)

export const RULE_TEMPLATE_CONDITIONS: Readonly<Record<string, string>> = {
  ...RULE_TEMPLATE_CONDITIONS_1,
  ...RULE_TEMPLATE_CONDITIONS_2,
}
