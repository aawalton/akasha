import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const ruleCompanionGreenSell = {
  id: "01a0728b-10d1-72a5-b4a8-e21e1d27654a",
  pageTypeSlug: "temper-inventory-rule",
  slug: "rule-companion-green-sell",
  title: "Sell low-quality companion gear",
  description:
    "Sells companion equipment of superior (blue) quality or lower. Higher-quality companion gear is preserved.",
  goal: "sell",
  conditions: "jsonl",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "companion",
  displayOrder: 66,
  action: "sell",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "companion-green-sell",
} as const satisfies TemperInventoryRule
