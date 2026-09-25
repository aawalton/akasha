import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleTreasuresSell = {
  id: "01a0728b-8ec1-76a0-b421-1147ce64b46f",
  type: "page-type/temper-inventory-rule",
  slug: "rule-treasures-sell",
  title: "Sell common treasures",
  description:
    "Sells treasures up to superior (blue) quality at a merchant. Higher-quality treasures are preserved for banking or guild store listing.",
  goal: "temper-rule-goal/sell",
  conditions: "jsonl",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/treasures",
  displayOrder: 72,
  action: "temper-item-action/sell",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
} as const satisfies TemperInventoryRule
