import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const ruleTreasuresSell = {
  id: "01a0728b-8ec1-76a0-b421-1147ce64b46f",
  pageTypeSlug: "temper-inventory-rule",
  type: "temper-inventory-rule",
  slug: "rule-treasures-sell",
  title: "Sell common treasures",
  description:
    "Sells treasures up to superior (blue) quality at a merchant. Higher-quality treasures are preserved for banking or guild store listing.",
  goal: "sell",
  conditions: "jsonl",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "treasures",
  displayOrder: 68,
  action: "sell",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "treasures-sell",
} as const satisfies TemperInventoryRule
