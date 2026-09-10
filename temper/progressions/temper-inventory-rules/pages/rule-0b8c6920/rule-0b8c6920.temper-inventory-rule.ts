import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.types.ts"

export const rule0b8c6920 = {
  id: "01a0728a-d6fd-7737-87c7-04ad0183a259",
  pageTypeSlug: "temper-inventory-rule",
  type: "temper-inventory-rule",
  slug: "rule-0b8c6920",
  title: "Destroy unsellable low food",
  description: "Spine step 6, food parallel to drink (Alan 2026-07-05: food and drink parallel).",
  conditions: "jsonl",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "food",
  displayOrder: 81,
  action: "destroy",
  active: true,
  updatedAt: "2026-07-05T13:32:43.766Z",
} as const satisfies TemperInventoryRule
