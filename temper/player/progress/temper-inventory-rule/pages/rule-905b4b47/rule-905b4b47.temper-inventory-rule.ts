import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const rule905b4b47 = {
  id: "01a0728a-f56e-7a62-b457-c78c5ce41801",
  type: "page-type/temper-inventory-rule",
  slug: "rule-905b4b47",
  title: "Stock stamina-restoration potions (white)",
  conditions: "jsonl",
  stockScope: "any-character",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "temper-item-category-tree/potions",
  displayOrder: 19,
  action: "temper-item-action/stock",
  active: true,
  updatedAt: "2026-06-03T05:11:34.381Z",
  destinationChain: "jsonl",
} as const satisfies TemperInventoryRule
