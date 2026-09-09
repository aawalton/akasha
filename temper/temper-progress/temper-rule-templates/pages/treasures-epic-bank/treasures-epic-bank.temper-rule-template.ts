import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const treasuresEpicBank = {
  id: "019e3104-2620-7fe8-87df-816b5a447437",
  pageTypeSlug: "temper-rule-template",
  slug: "treasures-epic-bank",
  title: "Bank epic+ treasures",
  key: "treasures-epic-bank",
  description: "Banks epic quality or higher treasures for safekeeping or later sale.",
  categoryId: "treasures",
  displayOrder: 32,
  action: "move-to",
  active: false,
  goal: "hoard",
  destination: "bank",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
