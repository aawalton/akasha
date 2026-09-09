import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const recipesKnownSell = {
  id: "019e3104-2628-7b7f-bd11-f6d4ad45e189",
  pageTypeSlug: "temper-rule-template",
  slug: "recipes-known-sell",
  title: "Sell known recipes",
  key: "recipes-known-sell",
  description:
    "Sells recipes you've already learned, up to fine (green) quality. Higher-quality known recipes are preserved in case they have trade value.",
  categoryId: "recipes",
  displayOrder: 41,
  action: "sell",
  active: false,
  goal: "sell",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
