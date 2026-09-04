import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const companionGreenSell = {
  id: "019e3104-2626-7136-8e6d-b66c7b5b20a6",
  pageTypeSlug: "temper-rule-template",
  slug: "companion-green-sell",
  title: "Sell low-quality companion gear",
  key: "companion-green-sell",
  description:
    "Sells companion equipment of superior (blue) quality or lower. Higher-quality companion gear is preserved.",
  categoryId: "companion",
  displayOrder: 38,
  action: "sell",
  active: false,
  goal: "sell",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
