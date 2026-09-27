import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const rule27204928 = {
  id: "01a0e37b-4d0f-782e-b9c4-2cc4ed2cdf05",
  type: "page-type/temper-inventory-rule",
  slug: "rule-27204928",
  title: "Stock Artaeum Takeaway Broth on Erin (20)",
  conditions: "jsonl",
  stockScope: "any-character",
  accountPage: "temper-account/alanarre",
  displayOrder: 18,
  action: "temper-item-action/stock",
  active: true,
  updatedAt: "2026-09-27T15:28:29.212Z",
  destinationChain: "jsonl",
  categoryId: "temper-item-category-tree/consumables",
} as const satisfies TemperInventoryRule
