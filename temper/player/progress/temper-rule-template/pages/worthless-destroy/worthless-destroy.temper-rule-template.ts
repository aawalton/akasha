import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const worthlessDestroy = {
  id: "019e3104-262e-7641-92a5-c6fd26067689",
  type: "page-type/temper-rule-template",
  slug: "worthless-destroy",
  title: "Destroy worthless items",
  key: "worthless-destroy",
  description:
    "Destroys normal (white) quality items that have no guild store value and no merchant value. Place at the very bottom — only items not caught by any higher-priority rule are destroyed.",
  categoryId: "temper-item-category-tree/all",
  displayOrder: 48,
  action: "temper-item-action/destroy",
  active: false,
  goal: "temper-rule-goal/destroy",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
