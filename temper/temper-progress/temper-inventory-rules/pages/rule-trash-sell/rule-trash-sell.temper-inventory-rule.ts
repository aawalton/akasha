import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const ruleTrashSell = {
  id: "01a0728b-6d6f-7ad9-99e1-27e4b6415eed",
  pageTypeSlug: "temper-inventory-rule",
  type: "temper-inventory-rule",
  slug: "rule-trash-sell",
  title: "Sell trash",
  description: "Sells items categorized as trash. These have no crafting or collectible value.",
  goal: "sell",
  conditions: "jsonl",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "trash",
  displayOrder: 64,
  action: "sell",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "trash-sell",
} as const satisfies TemperInventoryRule
