import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const drinkNormalSell = {
  id: "019e3104-262c-7bdc-801a-ba1782a26c77",
  pageTypeSlug: "temper-rule-template",
  slug: "drink-normal-sell",
  title: "Sell basic drinks",
  key: "drink-normal-sell",
  description:
    "Sells normal (white) quality non-crafted drinks. Crafted and higher-quality drinks are kept.",
  categoryId: "drink",
  displayOrder: 45,
  action: "sell",
  active: false,
  goal: "sell",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
