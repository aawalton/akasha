import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const legendaryNothing = {
  id: "019e3104-260a-7328-8521-8944b7303b8a",
  type: "page-type/temper-rule-template",
  slug: "legendary-nothing",
  title: "Protect legendary gear",
  key: "legendary-nothing",
  description:
    "Prevents legendary (gold) quality equipment from being affected by lower-priority rules. Place above sell and deconstruct rules to safeguard your best gear.",
  categoryId: "temper-item-category-tree/equipment",
  displayOrder: 5,
  action: "temper-item-action/nothing",
  active: false,
  goal: "temper-rule-goal/equip",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
