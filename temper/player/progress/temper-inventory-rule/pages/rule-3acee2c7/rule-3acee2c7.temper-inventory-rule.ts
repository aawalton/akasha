import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const rule3acee2c7 = {
  id: "01a0728a-d6fe-779d-9a67-78895194f7f3",
  type: "page-type/temper-inventory-rule",
  slug: "rule-3acee2c7",
  title: "Sell known recipes",
  description:
    "Disposal spine step 5: known-by-all recipes to merchant; valuable ones list first via fc1c9638. Closes gap A1.",
  conditions: "jsonl",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/recipes",
  displayOrder: 80,
  action: "temper-item-action/sell",
  active: true,
  updatedAt: "2026-07-05T13:20:37.492Z",
} as const satisfies TemperInventoryRule
