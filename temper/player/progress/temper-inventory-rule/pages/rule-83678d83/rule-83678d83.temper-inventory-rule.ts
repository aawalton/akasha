import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const rule83678d83 = {
  id: "01a0d495-43ad-74a7-93ab-31da12f8f43a",
  type: "page-type/temper-inventory-rule",
  slug: "rule-83678d83",
  title: "Stock Corrupting Bloody Mara (20/char, 100 bank)",
  conditions: "jsonl",
  stockScope: "any-character",
  accountPage: "temper-account/alanarre",
  displayOrder: 16,
  action: "temper-item-action/stock",
  active: true,
  updatedAt: "2026-09-24T18:31:57.951Z",
  destinationChain: "jsonl",
  categoryId: "temper-item-category-tree/drink",
  craftShortfall: true,
} as const satisfies TemperInventoryRule
