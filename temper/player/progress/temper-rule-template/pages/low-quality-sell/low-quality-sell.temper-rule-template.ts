import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const lowQualitySell = {
  id: "019e3104-262d-7918-8dcc-4b97684d4e61",
  type: "page-type/temper-rule-template",
  slug: "low-quality-sell",
  title: "Sell low quality items",
  key: "low-quality-sell",
  description:
    "Sells items of fine (green) quality or lower at a merchant. Higher-quality items are preserved for other rules. Place near the bottom — items caught by higher-priority rules are unaffected.",
  categoryId: "temper-item-category-tree/all",
  displayOrder: 47,
  action: "temper-item-action/sell",
  active: false,
  goal: "temper-rule-goal/sell",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
