import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const valuableNothing = {
  id: "019e3104-2611-7048-800c-d9e518987d2d",
  type: "page-type/temper-rule-template",
  slug: "valuable-nothing",
  title: "Protect valuable items",
  key: "valuable-nothing",
  description:
    "Prevents items with a guild store value of 10,000g or more from being affected by lower-priority rules. Place above sell and deconstruct rules to safeguard items worth trading.",
  categoryId: "temper-item-category-tree/all",
  displayOrder: 12,
  action: "temper-item-action/nothing",
  active: false,
  goal: "temper-rule-goal/hoard",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
