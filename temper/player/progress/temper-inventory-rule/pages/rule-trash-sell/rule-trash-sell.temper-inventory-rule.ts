import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleTrashSell = {
  id: "01a0728b-6d6f-7ad9-99e1-27e4b6415eed",
  type: "page-type/temper-inventory-rule",
  slug: "rule-trash-sell",
  title: "Sell trash",
  description: "Sells items categorized as trash. These have no crafting or collectible value.",
  goal: "temper-rule-goal/sell",
  conditions: "jsonl",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/trash",
  displayOrder: 67,
  action: "temper-item-action/sell",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "temper-rule-template/trash-sell",
} as const satisfies TemperInventoryRule
