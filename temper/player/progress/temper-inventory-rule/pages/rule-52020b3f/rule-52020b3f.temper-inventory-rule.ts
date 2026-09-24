import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const rule52020b3f = {
  id: "01a0728a-f56c-72a8-b208-019bf4973519",
  type: "page-type/temper-inventory-rule",
  slug: "rule-52020b3f",
  title: "Scrolls",
  conditions: "jsonl",
  destination: "character:8796093022338107",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/scrolls",
  displayOrder: 0,
  action: "temper-item-action/move-to",
  active: true,
  updatedAt: "2026-09-12T12:02:38.463Z",
} as const satisfies TemperInventoryRule
