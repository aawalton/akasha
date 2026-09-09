import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const treasuresSell = {
  id: "019e3104-2627-7b26-8ce5-f198e4be0e34",
  pageTypeSlug: "temper-rule-template",
  slug: "treasures-sell",
  title: "Sell common treasures",
  key: "treasures-sell",
  description:
    "Sells treasures up to superior (blue) quality at a merchant. Higher-quality treasures are preserved for banking or guild store listing.",
  categoryId: "treasures",
  displayOrder: 40,
  action: "sell",
  active: false,
  goal: "sell",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
