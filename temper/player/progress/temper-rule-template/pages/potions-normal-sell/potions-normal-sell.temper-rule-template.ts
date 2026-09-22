import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const potionsNormalSell = {
  id: "019e3104-2629-7ebe-9f50-1a7872c15fd0",
  type: "page-type/temper-rule-template",
  slug: "potions-normal-sell",
  title: "Sell basic potions",
  key: "potions-normal-sell",
  description:
    "Sells normal (white) quality non-crafted potions. Crafted and higher-quality potions are kept.",
  categoryId: "temper-item-category-tree/potions",
  displayOrder: 43,
  action: "temper-item-action/sell",
  active: false,
  goal: "temper-rule-goal/sell",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
