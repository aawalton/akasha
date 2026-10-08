import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleTreasuresStolenFence = {
  id: "01a0728b-8ec1-7536-8fc5-234be5e73ba0",
  type: "page-type/temper-inventory-rule",
  slug: "rule-treasures-stolen-fence",
  title: "Fence stolen treasures",
  description:
    "Sells stolen treasures at a fence. Stolen treasures can't be sold to normal merchants.",
  goal: "temper-rule-goal/sell",
  conditions: "jsonl",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/treasures",
  displayOrder: 76,
  action: "temper-item-action/fence-sell",
  active: true,
  ruleChangedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  createdAt: "2026-09-05T17:09:03.809Z",
  updatedAt: "2026-10-08T14:43:46.000Z",
} as const satisfies TemperInventoryRule
