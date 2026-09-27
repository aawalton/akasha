import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const rule91d78da5 = {
  id: "01a0e31c-a7ec-7b31-a060-792edd050eb0",
  type: "page-type/temper-inventory-rule",
  slug: "rule-91d78da5",
  title: "Stock lockpicks",
  description:
    "Stocks 200 lockpicks on every character by priority and banks the rest; buys the shortfall of 200 per character at a merchant.",
  conditions: "jsonl",
  accountPage: "temper-account/alanarre",
  displayOrder: 87,
  action: "temper-item-action/stock",
  active: true,
  updatedAt: "2026-09-27T13:45:16.444Z",
  destinationChain: "jsonl",
  categoryId: "temper-item-category-tree/lockpicks",
  buyShortfall: true,
} as const satisfies TemperInventoryRule
