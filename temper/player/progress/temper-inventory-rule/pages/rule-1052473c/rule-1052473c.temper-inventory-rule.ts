import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const rule1052473c = {
  id: "01a0ded2-f2cf-7255-9b6c-efcc800570de",
  type: "page-type/temper-inventory-rule",
  slug: "rule-1052473c",
  title: "Stock health-restoration potions",
  conditions: "jsonl",
  stockScope: "any-character",
  accountPage: "temper-account/alanarre",
  displayOrder: 22,
  action: "temper-item-action/stock",
  active: true,
  updatedAt: "2026-09-26T17:46:19.275Z",
  locked: false,
  destinationChain: "jsonl",
  categoryId: "temper-item-category-tree/potions",
} as const satisfies TemperInventoryRule
