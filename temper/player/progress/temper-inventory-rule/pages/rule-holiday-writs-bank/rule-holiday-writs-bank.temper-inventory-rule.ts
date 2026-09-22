import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleHolidayWritsBank = {
  id: "01a0728b-4fbc-78e7-9225-32778a10dad0",
  type: "page-type/temper-inventory-rule",
  slug: "rule-holiday-writs-bank",
  title: "Bank holiday writs",
  description:
    "Stashes holiday event writs in the bank. Complete them during events for bonus rewards.",
  goal: "temper-rule-goal/task",
  destination: "guild-bank:Walton Mountain",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "temper-item-category-tree/holiday-writs",
  displayOrder: 47,
  action: "temper-item-action/move-to",
  active: true,
  updatedAt: "2026-07-05T12:14:14.074Z",
  locked: true,
  fromTemplate: "temper-rule-template/holiday-writs-bank",
} as const satisfies TemperInventoryRule
