import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const rule72039e8e = {
  id: "01a0728a-f56d-716e-8bf1-69a08e33dabb",
  type: "page-type/temper-inventory-rule",
  slug: "rule-72039e8e",
  title: "All stolen scrolls → launder",
  conditions: "jsonl",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/scrolls",
  displayOrder: 39,
  action: "temper-item-action/fence-launder",
  active: true,
  ruleChangedAt: "2026-06-01T22:02:01.494Z",
  createdAt: "2026-09-05T17:08:24.557Z",
  updatedAt: "2026-10-08T14:43:46.000Z",
} as const satisfies TemperInventoryRule
