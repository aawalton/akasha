import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleDrinkNormalSell = {
  id: "01a0728b-2e7d-7fe5-9e8b-739648f91756",
  type: "page-type/temper-inventory-rule",
  slug: "rule-drink-normal-sell",
  title: "Sell basic drinks",
  description:
    "Sells normal (white) quality non-crafted drinks. Crafted and higher-quality drinks are kept.",
  goal: "temper-rule-goal/sell",
  conditions: "jsonl",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "temper-item-category-tree/drink",
  displayOrder: 75,
  action: "temper-item-action/sell",
  active: true,
  updatedAt: "2026-07-05T12:17:47.953Z",
  locked: true,
  fromTemplate: "temper-rule-template/drink-normal-sell",
} as const satisfies TemperInventoryRule
