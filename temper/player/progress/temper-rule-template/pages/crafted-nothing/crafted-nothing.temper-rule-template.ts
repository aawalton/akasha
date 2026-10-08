import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const craftedNothing = {
  id: "019e3104-260b-72d1-adc2-e89106a13e08",
  type: "page-type/temper-rule-template",
  slug: "crafted-nothing",
  title: "Protect crafted gear",
  key: "crafted-nothing",
  description:
    "Prevents crafted equipment from being affected by lower-priority rules. Useful for keeping gear you've invested materials into.",
  categoryId: "temper-item-category-tree/equipment",
  displayOrder: 6,
  action: "temper-item-action/nothing",
  active: false,
  goal: "temper-rule-goal/equip",
  conditions: "jsonl",
  createdAt: "2026-05-16T13:40:16.011Z",
  updatedAt: "2026-09-22T22:08:51.000Z",
} as const satisfies TemperRuleTemplate
