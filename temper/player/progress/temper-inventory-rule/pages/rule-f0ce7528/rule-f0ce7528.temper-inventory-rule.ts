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
  displayOrder: 24,
  action: "temper-item-action/stock",
  active: true,
  ruleChangedAt: "2026-06-03T05:11:34.000Z",
  destinationChain: "jsonl",
  createdAt: "2026-09-05T17:08:39.165Z",
  updatedAt: "2026-10-08T14:43:46.000Z",
} as const satisfies TemperInventoryRule
