import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const recipesKnownSell = {
  id: "019e3104-2628-7b7f-bd11-f6d4ad45e189",
  type: "page-type/temper-rule-template",
  slug: "recipes-known-sell",
  title: "Sell known recipes",
  key: "recipes-known-sell",
  description:
    "Sells recipes you've already learned, up to fine (green) quality. Higher-quality known recipes are preserved in case they have trade value.",
  categoryId: "temper-item-category-tree/recipes",
  displayOrder: 42,
  action: "temper-item-action/sell",
  active: false,
  goal: "temper-rule-goal/sell",
  conditions: "jsonl",
  createdAt: "2026-05-16T13:40:16.040Z",
  updatedAt: "2026-09-22T22:08:51.000Z",
} as const satisfies TemperRuleTemplate
