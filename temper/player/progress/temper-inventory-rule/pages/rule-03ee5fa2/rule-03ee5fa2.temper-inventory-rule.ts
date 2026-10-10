import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const rule03ee5fa2 = {
  id: "01a0728a-d6fc-793e-b78a-49cb46a647f5",
  type: "page-type/temper-inventory-rule",
  slug: "rule-03ee5fa2",
  title: "Knowledge-collectibles fragments to Trophies chest",
  destination: "house-storage:Trophies",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/knowledge-collectibles",
  displayOrder: 37,
  action: "temper-item-action/move-to",
  active: true,
  ruleChangedAt: "2026-06-01T12:53:34.875Z",
  createdAt: "2026-09-05T17:08:16.764Z",
  updatedAt: "2026-10-10T14:27:58.208Z",
} as const satisfies TemperInventoryRule
