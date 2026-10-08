import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const trashSell = {
  id: "019e3104-2624-7509-9de0-8c51f78d2dfa",
  type: "page-type/temper-rule-template",
  slug: "trash-sell",
  title: "Sell trash",
  key: "trash-sell",
  description: "Sells items categorized as trash. These have no crafting or collectible value.",
  categoryId: "temper-item-category-tree/trash",
  displayOrder: 37,
  action: "temper-item-action/sell",
  active: false,
  goal: "temper-rule-goal/sell",
  createdAt: "2026-05-16T13:40:16.036Z",
  updatedAt: "2026-09-22T22:08:51.000Z",
} as const satisfies TemperRuleTemplate
