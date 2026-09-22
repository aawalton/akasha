import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const junkSell = {
  id: "019e3104-2625-71f1-b471-1e111e52165c",
  type: "page-type/temper-rule-template",
  slug: "junk-sell",
  title: "Sell junk",
  key: "junk-sell",
  description: "Sells items in the junk category at a merchant.",
  categoryId: "temper-item-category-tree/junk",
  displayOrder: 38,
  action: "temper-item-action/sell",
  active: false,
  goal: "temper-rule-goal/sell",
} as const satisfies TemperRuleTemplate
