import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const rule263273e9 = {
  id: "01a0728a-d6fd-7786-99e5-a6abaa1f647c",
  pageTypeSlug: "temper-inventory-rule",
  slug: "rule-263273e9",
  title: "All non-stolen scrolls → Crown Items",
  conditions: "jsonl",
  destination: "house-storage:4677",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "scrolls",
  displayOrder: 34,
  action: "move-to",
  active: true,
  updatedAt: "2026-06-01T22:02:02.448Z",
} as const satisfies TemperInventoryRule
