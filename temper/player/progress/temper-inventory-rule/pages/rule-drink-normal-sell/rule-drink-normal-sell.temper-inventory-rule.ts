import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleDrinkNormalSell = {
  id: "01a0728b-2e7d-7fe5-9e8b-739648f91756",
  type: "page-type/temper-inventory-rule",
  slug: "rule-drink-normal-sell",
  title: "Sell basic drinks",
  description:
    "Sells normal (white) quality non-crafted drinks. Crafted and higher-quality drinks are kept.",
  goal: "temper-rule-goal/sell",
  conditions: "jsonl",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/drink",
  displayOrder: 82,
  action: "temper-item-action/sell",
  active: true,
  ruleChangedAt: "2026-07-05T12:17:47.953Z",
  locked: true,
  createdAt: "2026-09-05T17:08:39.165Z",
  updatedAt: "2026-10-08T14:43:46.000Z",
} as const satisfies TemperInventoryRule
