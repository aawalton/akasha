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
  displayOrder: 74,
  action: "temper-item-action/sell",
  active: true,
  ruleChangedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  createdAt: "2026-09-05T17:08:47.677Z",
  updatedAt: "2026-10-08T14:43:46.000Z",
} as const satisfies TemperInventoryRule
