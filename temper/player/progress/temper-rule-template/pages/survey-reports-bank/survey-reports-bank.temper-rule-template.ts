import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const surveyReportsBank = {
  id: "019e3104-2618-72cb-bf08-c915663ebbae",
  type: "page-type/temper-rule-template",
  slug: "survey-reports-bank",
  title: "Bank survey reports",
  key: "survey-reports-bank",
  description:
    "Stashes survey reports in the bank for later use. Survey reports lead to rich crafting material nodes.",
  categoryId: "temper-item-category-tree/survey-reports",
  displayOrder: 21,
  action: "temper-item-action/move-to",
  active: false,
  goal: "temper-rule-goal/task",
  destination: "bank",
} as const satisfies TemperRuleTemplate
