import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const rule90d1aa3b = {
  id: "01a0728a-f56f-72eb-8914-32da9b6ac87e",
  pageTypeSlug: "temper-inventory-rule",
  type: "temper-inventory-rule",
  slug: "rule-90d1aa3b",
  title: "Sell known scripts",
  description: "Dispose of scribing scripts once every character knows them",
  conditions: "jsonl",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "scripts",
  displayOrder: 76,
  action: "sell",
  active: true,
  updatedAt: "2026-06-02T18:57:41.940Z",
} as const satisfies TemperInventoryRule
