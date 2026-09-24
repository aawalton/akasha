import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const rule03ee5fa2 = {
  id: "01a0728a-d6fc-793e-b78a-49cb46a647f5",
  type: "page-type/temper-inventory-rule",
  slug: "rule-03ee5fa2",
  title: "Knowledge-collectibles fragments to Trophies chest",
  destination: "house-storage:4680",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/knowledge-collectibles",
  displayOrder: 31,
  action: "temper-item-action/move-to",
  active: true,
  updatedAt: "2026-06-01T12:53:34.875Z",
} as const satisfies TemperInventoryRule
