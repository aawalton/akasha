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
  displayOrder: 78,
  action: "temper-item-action/sell",
  active: true,
  ruleChangedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  createdAt: "2026-09-05T17:09:03.809Z",
  updatedAt: "2026-10-08T14:43:46.000Z",
} as const satisfies TemperInventoryRule
