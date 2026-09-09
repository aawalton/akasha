import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const ruleDrinkNormalSell = {
  id: "01a0728b-2e7d-7fe5-9e8b-739648f91756",
  pageTypeSlug: "temper-inventory-rule",
  type: "temper-inventory-rule",
  slug: "rule-drink-normal-sell",
  title: "Sell basic drinks",
  description:
    "Sells normal (white) quality non-crafted drinks. Crafted and higher-quality drinks are kept.",
  goal: "sell",
  conditions: "jsonl",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "drink",
  displayOrder: 73,
  action: "sell",
  active: true,
  updatedAt: "2026-07-05T12:17:47.953Z",
  locked: true,
  fromTemplate: "drink-normal-sell",
} as const satisfies TemperInventoryRule
