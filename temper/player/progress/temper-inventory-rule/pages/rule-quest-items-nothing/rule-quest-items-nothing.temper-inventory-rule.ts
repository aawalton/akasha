import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleQuestItemsNothing = {
  id: "01a0728b-6d6e-7c82-a363-ba9229c0e24f",
  type: "page-type/temper-inventory-rule",
  slug: "rule-quest-items-nothing",
  title: "Protect quest items",
  description:
    "Prevents quest-related items from being affected by lower-priority rules. Keep them safe until the associated quest is completed.",
  goal: "temper-rule-goal/task",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/quest-items",
  displayOrder: 57,
  action: "temper-item-action/nothing",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
} as const satisfies TemperInventoryRule
