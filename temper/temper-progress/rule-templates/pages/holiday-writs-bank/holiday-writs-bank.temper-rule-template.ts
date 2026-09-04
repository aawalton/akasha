import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const holidayWritsBank = {
  id: "019e3104-2616-7977-9a0f-2495efca465c",
  pageTypeSlug: "temper-rule-template",
  slug: "holiday-writs-bank",
  title: "Bank holiday writs",
  key: "holiday-writs-bank",
  description:
    "Stashes holiday event writs in the bank. Complete them during events for bonus rewards.",
  categoryId: "holiday-writs",
  displayOrder: 19,
  action: "move-to",
  active: false,
  goal: "task",
  destination: "bank",
} as const satisfies TemperRuleTemplate
