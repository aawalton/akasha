import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleFe8bd926 = {
  id: "01a09b35-1009-766e-b44a-af6c836cd45a",
  type: "page-type/temper-inventory-rule",
  slug: "rule-fe8bd926",
  title: "Experience commendations → Bank",
  conditions: "jsonl",
  destination: "bank",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "temper-item-category-tree/scrolls",
  displayOrder: 34,
  action: "temper-item-action/move-to",
  active: true,
  updatedAt: "2026-09-13T14:39:00.855Z",
} as const satisfies TemperInventoryRule
