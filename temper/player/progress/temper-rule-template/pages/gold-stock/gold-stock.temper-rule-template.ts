import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const goldStock = {
  id: "019e3104-2604-7bfa-b202-1d8e5fce47aa",
  type: "page-type/temper-rule-template",
  slug: "gold-stock",
  title: "Stock gold",
  key: "gold-stock",
  description:
    "Keeps up to 1,000,000 gold on each character. Excess is deposited into the bank when visiting.",
  categoryId: "temper-item-category-tree/currency-gold",
  displayOrder: 0,
  action: "temper-item-action/stock",
  active: false,
  goal: "temper-rule-goal/use",
  stockScope: "any-character",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
