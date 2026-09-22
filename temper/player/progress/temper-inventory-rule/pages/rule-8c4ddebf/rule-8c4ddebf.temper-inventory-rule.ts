import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const rule8c4ddebf = {
  id: "01a0728a-f56d-7fbc-b5db-16a0fc5dc403",
  type: "page-type/temper-inventory-rule",
  slug: "rule-8c4ddebf",
  title: "Stock magicka-restoration potions (white)",
  conditions: "jsonl",
  stockScope: "any-character",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "temper-item-category-tree/potions",
  displayOrder: 20,
  action: "temper-item-action/stock",
  active: true,
  updatedAt: "2026-06-03T05:11:34.742Z",
  destinationChain: "jsonl",
} as const satisfies TemperInventoryRule
