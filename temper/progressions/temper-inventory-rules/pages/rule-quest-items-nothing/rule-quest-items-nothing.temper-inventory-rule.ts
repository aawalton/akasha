import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const ruleQuestItemsNothing = {
  id: "01a0728b-6d6e-7c82-a363-ba9229c0e24f",
  pageTypeSlug: "temper-inventory-rule",
  type: "temper-inventory-rule",
  slug: "rule-quest-items-nothing",
  title: "Protect quest items",
  description:
    "Prevents quest-related items from being affected by lower-priority rules. Keep them safe until the associated quest is completed.",
  goal: "task",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "quest-items",
  displayOrder: 53,
  action: "nothing",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "quest-items-nothing",
} as const satisfies TemperInventoryRule
