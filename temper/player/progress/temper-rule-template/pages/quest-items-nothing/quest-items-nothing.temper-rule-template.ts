import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const questItemsNothing = {
  id: "019e3104-261b-7569-b3d0-250b209440ea",
  type: "page-type/temper-rule-template",
  slug: "quest-items-nothing",
  title: "Protect quest items",
  key: "quest-items-nothing",
  description:
    "Prevents quest-related items from being affected by lower-priority rules. Keep them safe until the associated quest is completed.",
  categoryId: "temper-item-category-tree/quest-items",
  displayOrder: 25,
  action: "temper-item-action/nothing",
  active: false,
  goal: "temper-rule-goal/task",
} as const satisfies TemperRuleTemplate
