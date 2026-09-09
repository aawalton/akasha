import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const rulePotionsNormalSell = {
  id: "01a0728b-6d6e-7dd3-a9e3-450646599b73",
  pageTypeSlug: "temper-inventory-rule",
  type: "temper-inventory-rule",
  slug: "rule-potions-normal-sell",
  title: "Sell basic potions",
  description:
    "Sells normal (white) quality non-crafted potions. Crafted and higher-quality potions are kept.",
  goal: "sell",
  conditions: "jsonl",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "potions",
  displayOrder: 70,
  action: "sell",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "potions-normal-sell",
} as const satisfies TemperInventoryRule
