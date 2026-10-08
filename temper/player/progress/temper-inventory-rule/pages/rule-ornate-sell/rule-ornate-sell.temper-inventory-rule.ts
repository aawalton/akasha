import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleOrnateSell = {
  id: "01a0728b-4fbd-7169-8ab3-7f26e9d5fb5b",
  type: "page-type/temper-inventory-rule",
  slug: "rule-ornate-sell",
  title: "Sell ornate gear",
  description:
    "Sells equipment with the Ornate trait. Ornate items sell for more gold at merchants and have no crafting use.",
  goal: "temper-rule-goal/sell",
  conditions: "jsonl",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/equipment",
  displayOrder: 50,
  action: "temper-item-action/sell",
  active: true,
  ruleChangedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  createdAt: "2026-09-05T17:08:47.677Z",
  updatedAt: "2026-10-08T14:43:46.000Z",
} as const satisfies TemperInventoryRule
