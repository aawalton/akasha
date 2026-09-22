import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const reconstructedNothing = {
  id: "019e3104-260d-7216-94db-9f9abfd643f3",
  type: "page-type/temper-rule-template",
  slug: "reconstructed-nothing",
  title: "Protect reconstructed gear",
  key: "reconstructed-nothing",
  description:
    "Prevents reconstructed equipment from being affected by lower-priority rules. Reconstructed gear costs transmute crystals and set collection knowledge.",
  categoryId: "temper-item-category-tree/equipment",
  displayOrder: 8,
  action: "temper-item-action/nothing",
  active: false,
  goal: "temper-rule-goal/equip",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
