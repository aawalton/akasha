import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const rule0b8c6920 = {
  id: "01a0728a-d6fd-7737-87c7-04ad0183a259",
  type: "page-type/temper-inventory-rule",
  slug: "rule-0b8c6920",
  title: "Destroy unsellable low food",
  description: "Spine step 6, food parallel to drink (Alan 2026-07-05: food and drink parallel).",
  conditions: "jsonl",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/food",
  displayOrder: 84,
  action: "temper-item-action/destroy",
  active: true,
  updatedAt: "2026-07-05T13:32:43.766Z",
} as const satisfies TemperInventoryRule
