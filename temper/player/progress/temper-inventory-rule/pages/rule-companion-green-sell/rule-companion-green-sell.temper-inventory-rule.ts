import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleCompanionGreenSell = {
  id: "01a0728b-10d1-72a5-b4a8-e21e1d27654a",
  type: "page-type/temper-inventory-rule",
  slug: "rule-companion-green-sell",
  title: "Sell low-quality companion gear",
  description:
    "Sells companion equipment of superior (blue) quality or lower. Higher-quality companion gear is preserved.",
  goal: "temper-rule-goal/sell",
  conditions: "jsonl",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/companion",
  displayOrder: 69,
  action: "temper-item-action/sell",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
} as const satisfies TemperInventoryRule
