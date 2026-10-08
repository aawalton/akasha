import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const rule8c4ddebf = {
  id: "01a0728a-f56d-7fbc-b5db-16a0fc5dc403",
  type: "page-type/temper-inventory-rule",
  slug: "rule-8c4ddebf",
  title: "Stock magicka-restoration potions",
  conditions: "jsonl",
  stockScope: "any-character",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/potions",
  displayOrder: 27,
  action: "temper-item-action/stock",
  active: true,
  ruleChangedAt: "2026-09-26T17:45:35.127Z",
  destinationChain: "jsonl",
  createdAt: "2026-09-05T17:08:24.557Z",
  updatedAt: "2026-10-08T14:43:46.000Z",
} as const satisfies TemperInventoryRule
