import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const rule263273e9 = {
  id: "01a0728a-d6fd-7786-99e5-a6abaa1f647c",
  type: "page-type/temper-inventory-rule",
  slug: "rule-263273e9",
  title: "All non-stolen scrolls → Crown Items",
  conditions: "jsonl",
  destination: "house-storage:4678",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/scrolls",
  displayOrder: 42,
  action: "temper-item-action/move-to",
  active: true,
  ruleChangedAt: "2026-10-10T14:15:00.000Z",
  createdAt: "2026-09-05T17:08:16.765Z",
  updatedAt: "2026-10-10T14:10:16.955Z",
} as const satisfies TemperInventoryRule
