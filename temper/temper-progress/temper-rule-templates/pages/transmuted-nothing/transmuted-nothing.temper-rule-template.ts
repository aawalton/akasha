import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const transmutedNothing = {
  id: "019e3104-260e-71a0-aa4a-5d2e9e076fca",
  pageTypeSlug: "temper-rule-template",
  slug: "transmuted-nothing",
  title: "Protect transmuted gear",
  key: "transmuted-nothing",
  description:
    "Prevents transmuted equipment from being affected by lower-priority rules. Transmuted gear represents a transmute crystal investment.",
  categoryId: "equipment",
  displayOrder: 9,
  action: "nothing",
  active: false,
  goal: "equip",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
