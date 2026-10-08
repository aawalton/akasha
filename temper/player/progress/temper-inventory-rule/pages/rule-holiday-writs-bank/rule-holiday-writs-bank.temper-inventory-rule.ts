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
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/holiday-writs",
  displayOrder: 54,
  action: "temper-item-action/move-to",
  active: true,
  ruleChangedAt: "2026-07-05T12:14:14.074Z",
  locked: true,
  createdAt: "2026-09-05T17:08:47.676Z",
  updatedAt: "2026-10-08T14:43:46.000Z",
} as const satisfies TemperInventoryRule
