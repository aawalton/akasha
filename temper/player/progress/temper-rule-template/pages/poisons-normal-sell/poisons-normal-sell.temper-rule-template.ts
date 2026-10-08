import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const poisonsNormalSell = {
  id: "019e3104-262b-7172-acfb-0833ef728080",
  type: "page-type/temper-rule-template",
  slug: "poisons-normal-sell",
  title: "Sell basic poisons",
  key: "poisons-normal-sell",
  description:
    "Sells normal (white) quality non-crafted poisons. Crafted and higher-quality poisons are kept.",
  categoryId: "temper-item-category-tree/poisons",
  displayOrder: 44,
  action: "temper-item-action/sell",
  active: false,
  goal: "temper-rule-goal/sell",
  conditions: "jsonl",
  createdAt: "2026-05-16T13:40:16.043Z",
  updatedAt: "2026-09-22T22:08:51.000Z",
} as const satisfies TemperRuleTemplate
