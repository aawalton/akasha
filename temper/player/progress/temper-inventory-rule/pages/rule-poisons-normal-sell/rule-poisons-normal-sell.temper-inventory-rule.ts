import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const rulePoisonsNormalSell = {
  id: "01a0728b-6d6d-78ad-89e0-d935fa86f48a",
  type: "page-type/temper-inventory-rule",
  slug: "rule-poisons-normal-sell",
  title: "Sell basic poisons",
  description:
    "Sells normal (white) quality non-crafted poisons. Crafted and higher-quality poisons are kept.",
  goal: "temper-rule-goal/sell",
  conditions: "jsonl",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/poisons",
  displayOrder: 80,
  action: "temper-item-action/sell",
  active: true,
  ruleChangedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  createdAt: "2026-09-05T17:08:55.277Z",
  updatedAt: "2026-10-08T14:43:46.000Z",
} as const satisfies TemperInventoryRule
