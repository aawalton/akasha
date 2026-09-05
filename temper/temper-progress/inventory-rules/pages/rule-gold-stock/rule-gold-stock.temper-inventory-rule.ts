import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const ruleGoldStock = {
  id: "01a0728b-4fbc-7854-8786-0d70a2944ea8",
  pageTypeSlug: "temper-inventory-rule",
  slug: "rule-gold-stock",
  title: "Stock gold",
  description:
    "Keeps up to 1,000,000 gold on each character. Excess is deposited into the bank when visiting.",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "currency-gold",
  displayOrder: 5,
  action: "stock",
  active: true,
  goal: "use",
  locked: true,
  fromTemplate: "gold-stock",
  stockScope: "any-character",
  conditions: "jsonl",
} as const satisfies TemperInventoryRule
