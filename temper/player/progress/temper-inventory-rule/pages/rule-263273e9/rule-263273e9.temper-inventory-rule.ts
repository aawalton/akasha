import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const rule263273e9 = {
  id: "01a0728a-d6fd-7786-99e5-a6abaa1f647c",
  type: "page-type/temper-inventory-rule",
  slug: "rule-263273e9",
  title: "All non-stolen scrolls → Crown Items",
  conditions: "jsonl",
  destination: "house-storage:4677",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/scrolls",
  displayOrder: 35,
  action: "temper-item-action/move-to",
  active: true,
  updatedAt: "2026-06-01T22:02:02.448Z",
} as const satisfies TemperInventoryRule
