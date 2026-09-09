import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const valuableNothing = {
  id: "019e3104-2611-7048-800c-d9e518987d2d",
  pageTypeSlug: "temper-rule-template",
  slug: "valuable-nothing",
  title: "Protect valuable items",
  key: "valuable-nothing",
  description:
    "Prevents items with a guild store value of 10,000g or more from being affected by lower-priority rules. Place above sell and deconstruct rules to safeguard items worth trading.",
  categoryId: "all",
  displayOrder: 12,
  action: "nothing",
  active: false,
  goal: "hoard",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
