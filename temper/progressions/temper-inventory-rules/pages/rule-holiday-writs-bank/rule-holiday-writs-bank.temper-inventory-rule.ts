import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.types.ts"

export const ruleHolidayWritsBank = {
  id: "01a0728b-4fbc-78e7-9225-32778a10dad0",
  pageTypeSlug: "temper-inventory-rule",
  type: "temper-inventory-rule",
  slug: "rule-holiday-writs-bank",
  title: "Bank holiday writs",
  description:
    "Stashes holiday event writs in the bank. Complete them during events for bonus rewards.",
  goal: "task",
  destination: "guild-bank:Walton Mountain",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "holiday-writs",
  displayOrder: 46,
  action: "move-to",
  active: true,
  updatedAt: "2026-07-05T12:14:14.074Z",
  locked: true,
  fromTemplate: "holiday-writs-bank",
} as const satisfies TemperInventoryRule
