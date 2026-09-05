import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const ruleTreasuresStolenFence = {
  id: "01a0728b-8ec1-7536-8fc5-234be5e73ba0",
  pageTypeSlug: "temper-inventory-rule",
  slug: "rule-treasures-stolen-fence",
  title: "Fence stolen treasures",
  description:
    "Sells stolen treasures at a fence. Stolen treasures can't be sold to normal merchants.",
  goal: "sell",
  conditions: "jsonl",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "treasures",
  displayOrder: 67,
  action: "fence-sell",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "treasures-stolen-fence",
} as const satisfies TemperInventoryRule
