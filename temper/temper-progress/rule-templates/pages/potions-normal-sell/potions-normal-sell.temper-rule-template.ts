import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const potionsNormalSell = {
  id: "019e3104-2629-7ebe-9f50-1a7872c15fd0",
  pageTypeSlug: "temper-rule-template",
  slug: "potions-normal-sell",
  title: "Sell basic potions",
  key: "potions-normal-sell",
  description:
    "Sells normal (white) quality non-crafted potions. Crafted and higher-quality potions are kept.",
  categoryId: "potions",
  displayOrder: 42,
  action: "sell",
  active: false,
  goal: "sell",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
