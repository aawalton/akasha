import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const transmutedNothing = {
  id: "019e3104-260e-71a0-aa4a-5d2e9e076fca",
  type: "page-type/temper-rule-template",
  slug: "transmuted-nothing",
  title: "Protect transmuted gear",
  key: "transmuted-nothing",
  description:
    "Prevents transmuted equipment from being affected by lower-priority rules. Transmuted gear represents a transmute crystal investment.",
  categoryId: "temper-item-category-tree/equipment",
  displayOrder: 9,
  action: "temper-item-action/nothing",
  active: false,
  goal: "temper-rule-goal/equip",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
