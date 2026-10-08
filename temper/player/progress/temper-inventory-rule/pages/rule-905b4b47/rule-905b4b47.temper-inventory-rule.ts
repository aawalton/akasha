import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const rule905b4b47 = {
  id: "01a0728a-f56e-7a62-b457-c78c5ce41801",
  type: "page-type/temper-inventory-rule",
  slug: "rule-905b4b47",
  title: "Stock stamina-restoration potions",
  conditions: "jsonl",
  stockScope: "any-character",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/potions",
  displayOrder: 26,
  action: "temper-item-action/stock",
  active: true,
  ruleChangedAt: "2026-09-26T17:45:14.624Z",
  destinationChain: "jsonl",
  createdAt: "2026-09-05T17:08:24.558Z",
  updatedAt: "2026-10-08T14:43:46.000Z",
} as const satisfies TemperInventoryRule
