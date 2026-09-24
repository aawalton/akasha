import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleAcb23368 = {
  id: "01a0728b-10d0-7661-8d28-70724b837b31",
  type: "page-type/temper-inventory-rule",
  slug: "rule-acb23368",
  title: "Sell Psijic Ambrosia recipe fragments",
  description:
    "Sells Psijic Ambrosia recipe fragments (Fragment I–IV) regardless of quality. Item: 64702–64705.",
  goal: "temper-rule-goal/sell",
  conditions: "jsonl",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/recipe-fragments",
  displayOrder: 27,
  action: "temper-item-action/sell",
  active: true,
  updatedAt: "2026-05-07T22:10:37.410Z",
} as const satisfies TemperInventoryRule
