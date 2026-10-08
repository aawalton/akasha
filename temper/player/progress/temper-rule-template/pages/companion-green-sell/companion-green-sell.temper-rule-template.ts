import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const companionGreenSell = {
  id: "019e3104-2626-7136-8e6d-b66c7b5b20a6",
  type: "page-type/temper-rule-template",
  slug: "companion-green-sell",
  title: "Sell low-quality companion gear",
  key: "companion-green-sell",
  description:
    "Sells companion equipment of superior (blue) quality or lower. Higher-quality companion gear is preserved.",
  categoryId: "temper-item-category-tree/companion",
  displayOrder: 39,
  action: "temper-item-action/sell",
  active: false,
  goal: "temper-rule-goal/sell",
  conditions: "jsonl",
  createdAt: "2026-05-16T13:40:16.038Z",
  updatedAt: "2026-09-22T22:08:51.000Z",
} as const satisfies TemperRuleTemplate
