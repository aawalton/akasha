import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleTreasuresSell = {
  id: "01a0728b-8ec1-76a0-b421-1147ce64b46f",
  type: "page-type/temper-inventory-rule",
  slug: "rule-treasures-sell",
  title: "Sell treasures",
  description:
    "Sells treasures of every quality at a merchant. Stolen treasures are fenced, and stolen epic or better treasures laundered, by the rules before this one.",
  goal: "temper-rule-goal/sell",
  conditions: "jsonl",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/treasures",
  displayOrder: 78,
  action: "temper-item-action/sell",
  active: true,
  ruleChangedAt: "2026-10-28T18:23:13.000Z",
  locked: true,
  createdAt: "2026-09-05T17:09:03.809Z",
  updatedAt: "2026-10-28T18:24:09.864Z",
} as const satisfies TemperInventoryRule
