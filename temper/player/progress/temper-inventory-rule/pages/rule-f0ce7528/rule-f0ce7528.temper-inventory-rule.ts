import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleF0ce7528 = {
  id: "01a0728b-2e7d-799b-b376-18298aac8ae9",
  type: "page-type/temper-inventory-rule",
  slug: "rule-f0ce7528",
  title: "Stock tri-restoration potions",
  conditions: "jsonl",
  stockScope: "any-character",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/potions",
  displayOrder: 18,
  action: "temper-item-action/stock",
  active: true,
  updatedAt: "2026-06-03T05:11:34.000Z",
  destinationChain: "jsonl",
} as const satisfies TemperInventoryRule
