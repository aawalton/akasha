import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const lowQualitySell = {
  id: "019e3104-262d-7918-8dcc-4b97684d4e61",
  pageTypeSlug: "temper-rule-template",
  slug: "low-quality-sell",
  title: "Sell low quality items",
  key: "low-quality-sell",
  description:
    "Sells items of fine (green) quality or lower at a merchant. Higher-quality items are preserved for other rules. Place near the bottom — items caught by higher-priority rules are unaffected.",
  categoryId: "all",
  displayOrder: 46,
  action: "sell",
  active: false,
  goal: "sell",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
