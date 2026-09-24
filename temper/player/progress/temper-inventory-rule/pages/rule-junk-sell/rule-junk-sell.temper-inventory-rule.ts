import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleJunkSell = {
  id: "01a0728b-4fbd-7bca-897f-6a7664af3476",
  type: "page-type/temper-inventory-rule",
  slug: "rule-junk-sell",
  title: "Sell junk",
  description: "Sells items in the junk category at a merchant.",
  goal: "temper-rule-goal/sell",
  conditions: "jsonl",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/junk",
  displayOrder: 67,
  action: "temper-item-action/sell",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "temper-rule-template/junk-sell",
} as const satisfies TemperInventoryRule
