import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const rulePotionsNormalSell = {
  id: "01a0728b-6d6e-7dd3-a9e3-450646599b73",
  type: "page-type/temper-inventory-rule",
  slug: "rule-potions-normal-sell",
  title: "Sell basic potions",
  description:
    "Sells normal (white) quality non-crafted potions. Crafted and higher-quality potions are kept.",
  goal: "temper-rule-goal/sell",
  conditions: "jsonl",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/potions",
  displayOrder: 73,
  action: "temper-item-action/sell",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "temper-rule-template/potions-normal-sell",
} as const satisfies TemperInventoryRule
