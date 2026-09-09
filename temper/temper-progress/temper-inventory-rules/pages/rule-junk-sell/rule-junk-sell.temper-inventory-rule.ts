import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const ruleJunkSell = {
  id: "01a0728b-4fbd-7bca-897f-6a7664af3476",
  pageTypeSlug: "temper-inventory-rule",
  type: "temper-inventory-rule",
  slug: "rule-junk-sell",
  title: "Sell junk",
  description: "Sells items in the junk category at a merchant.",
  goal: "sell",
  conditions: "jsonl",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "junk",
  displayOrder: 65,
  action: "sell",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "junk-sell",
} as const satisfies TemperInventoryRule
