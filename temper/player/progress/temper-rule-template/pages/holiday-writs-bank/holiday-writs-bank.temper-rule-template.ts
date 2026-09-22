import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const holidayWritsBank = {
  id: "019e3104-2616-7977-9a0f-2495efca465c",
  type: "page-type/temper-rule-template",
  slug: "holiday-writs-bank",
  title: "Bank holiday writs",
  key: "holiday-writs-bank",
  description:
    "Stashes holiday event writs in the bank. Complete them during events for bonus rewards.",
  categoryId: "temper-item-category-tree/holiday-writs",
  displayOrder: 19,
  action: "temper-item-action/move-to",
  active: false,
  goal: "temper-rule-goal/task",
  destination: "bank",
} as const satisfies TemperRuleTemplate
