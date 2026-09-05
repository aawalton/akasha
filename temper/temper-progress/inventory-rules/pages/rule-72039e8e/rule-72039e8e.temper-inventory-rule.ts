import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const rule72039e8e = {
  id: "01a0728a-f56d-716e-8bf1-69a08e33dabb",
  pageTypeSlug: "temper-inventory-rule",
  slug: "rule-72039e8e",
  title: "All stolen scrolls → launder",
  conditions: "jsonl",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "scrolls",
  displayOrder: 32,
  action: "fence-launder",
  active: true,
  updatedAt: "2026-06-01T22:02:01.494Z",
} as const satisfies TemperInventoryRule
