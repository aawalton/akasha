import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleValuableNothing = {
  id: "01a0728b-8ec3-7bb7-8f8c-3624870fbdf0",
  type: "page-type/temper-inventory-rule",
  slug: "rule-valuable-nothing",
  title: "List items worth >=5000g at guild store",
  description:
    "Lists any item with guild-store value (marketValue) >= 5000g that can be listed at a guild trader. Single guild-value gate (no vendor-value constraint). Pairs with low-quality-sell: >=5000 list, <5000 vendor-sell.",
  goal: "temper-rule-goal/hoard",
  conditions: "jsonl",
  destination: "character:8796093022338107",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/all",
  displayOrder: 41,
  action: "temper-item-action/list",
  active: true,
  updatedAt: "2026-06-02T20:49:37.762Z",
  locked: true,
  fromTemplate: "temper-rule-template/valuable-nothing",
} as const satisfies TemperInventoryRule
