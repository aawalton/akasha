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
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/currency-gold",
  displayOrder: 6,
  action: "temper-item-action/stock",
  active: true,
  ruleChangedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  createdAt: "2026-09-05T17:08:47.676Z",
  updatedAt: "2026-10-08T14:43:46.000Z",
} as const satisfies TemperInventoryRule
