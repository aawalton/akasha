import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const foodNormalSell = {
  id: "019e3104-262b-7ed8-9aad-80ace952cc0f",
  type: "page-type/temper-rule-template",
  slug: "food-normal-sell",
  title: "Sell basic food",
  key: "food-normal-sell",
  description:
    "Sells normal (white) quality non-crafted food. Crafted and higher-quality food is kept.",
  categoryId: "temper-item-category-tree/food",
  displayOrder: 45,
  action: "temper-item-action/sell",
  active: false,
  goal: "temper-rule-goal/sell",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
