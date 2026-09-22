import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleGoldStock = {
  id: "01a0728b-4fbc-7854-8786-0d70a2944ea8",
  type: "page-type/temper-inventory-rule",
  slug: "rule-gold-stock",
  title: "Stock gold",
  description:
    "Keeps up to 1,000,000 gold on each character. Excess is deposited into the bank when visiting.",
  goal: "temper-rule-goal/use",
  conditions: "jsonl",
  stockScope: "any-character",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "temper-item-category-tree/currency-gold",
  displayOrder: 5,
  action: "temper-item-action/stock",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "temper-rule-template/gold-stock",
} as const satisfies TemperInventoryRule
