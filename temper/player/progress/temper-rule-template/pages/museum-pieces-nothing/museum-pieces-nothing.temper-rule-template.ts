import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const museumPiecesNothing = {
  id: "019e3104-261a-78c9-ad6d-5f414754c1c5",
  type: "page-type/temper-rule-template",
  slug: "museum-pieces-nothing",
  title: "Protect museum pieces",
  key: "museum-pieces-nothing",
  description:
    "Prevents museum pieces from being affected by lower-priority rules. These are turn-in items for collections or achievements.",
  categoryId: "temper-item-category-tree/museum-pieces",
  displayOrder: 24,
  action: "temper-item-action/nothing",
  active: false,
  goal: "temper-rule-goal/task",
} as const satisfies TemperRuleTemplate
