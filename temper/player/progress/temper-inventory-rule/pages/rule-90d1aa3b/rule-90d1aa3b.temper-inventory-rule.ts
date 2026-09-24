import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const rule90d1aa3b = {
  id: "01a0728a-f56f-72eb-8914-32da9b6ac87e",
  type: "page-type/temper-inventory-rule",
  slug: "rule-90d1aa3b",
  title: "Sell known scripts",
  description: "Dispose of scribing scripts once every character knows them",
  conditions: "jsonl",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/scripts",
  displayOrder: 78,
  action: "temper-item-action/sell",
  active: true,
  updatedAt: "2026-09-12T15:33:39.566Z",
} as const satisfies TemperInventoryRule
