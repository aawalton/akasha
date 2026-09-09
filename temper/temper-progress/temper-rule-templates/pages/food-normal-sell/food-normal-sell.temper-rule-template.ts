import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const foodNormalSell = {
  id: "019e3104-262b-7ed8-9aad-80ace952cc0f",
  pageTypeSlug: "temper-rule-template",
  slug: "food-normal-sell",
  title: "Sell basic food",
  key: "food-normal-sell",
  description:
    "Sells normal (white) quality non-crafted food. Crafted and higher-quality food is kept.",
  categoryId: "food",
  displayOrder: 44,
  action: "sell",
  active: false,
  goal: "sell",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
