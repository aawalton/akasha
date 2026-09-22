import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const drinkNormalSell = {
  id: "019e3104-262c-7bdc-801a-ba1782a26c77",
  type: "page-type/temper-rule-template",
  slug: "drink-normal-sell",
  title: "Sell basic drinks",
  key: "drink-normal-sell",
  description:
    "Sells normal (white) quality non-crafted drinks. Crafted and higher-quality drinks are kept.",
  categoryId: "temper-item-category-tree/drink",
  displayOrder: 46,
  action: "temper-item-action/sell",
  active: false,
  goal: "temper-rule-goal/sell",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
