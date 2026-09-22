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
} as const satisfies TemperRuleTemplate
