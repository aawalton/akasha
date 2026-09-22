import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const treasuresSell = {
  id: "019e3104-2627-7b26-8ce5-f198e4be0e34",
  type: "page-type/temper-rule-template",
  slug: "treasures-sell",
  title: "Sell common treasures",
  key: "treasures-sell",
  description:
    "Sells treasures up to superior (blue) quality at a merchant. Higher-quality treasures are preserved for banking or guild store listing.",
  categoryId: "temper-item-category-tree/treasures",
  displayOrder: 41,
  action: "temper-item-action/sell",
  active: false,
  goal: "temper-rule-goal/sell",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
