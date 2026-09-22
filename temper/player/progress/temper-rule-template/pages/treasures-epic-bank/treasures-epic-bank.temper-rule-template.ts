import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const treasuresEpicBank = {
  id: "019e3104-2620-7fe8-87df-816b5a447437",
  type: "page-type/temper-rule-template",
  slug: "treasures-epic-bank",
  title: "Bank epic+ treasures",
  key: "treasures-epic-bank",
  description: "Banks epic quality or higher treasures for safekeeping or later sale.",
  categoryId: "temper-item-category-tree/treasures",
  displayOrder: 33,
  action: "temper-item-action/move-to",
  active: false,
  goal: "temper-rule-goal/hoard",
  destination: "bank",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
