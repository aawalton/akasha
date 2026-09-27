import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const rule5ff0294f = {
  id: "01a0e37b-8ced-7b0d-8a67-f8b55d778026",
  type: "page-type/temper-inventory-rule",
  slug: "rule-5ff0294f",
  title: "Stock Clockwork Citrus Filet on Erin (20)",
  conditions: "jsonl",
  stockScope: "any-character",
  accountPage: "temper-account/alanarre",
  displayOrder: 89,
  action: "temper-item-action/stock",
  active: true,
  updatedAt: "2026-09-27T15:28:38.360Z",
  categoryId: "temper-item-category-tree/consumables",
} as const satisfies TemperInventoryRule
