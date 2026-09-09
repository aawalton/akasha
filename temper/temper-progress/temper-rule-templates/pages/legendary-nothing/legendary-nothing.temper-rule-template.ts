import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const legendaryNothing = {
  id: "019e3104-260a-7328-8521-8944b7303b8a",
  pageTypeSlug: "temper-rule-template",
  slug: "legendary-nothing",
  title: "Protect legendary gear",
  key: "legendary-nothing",
  description:
    "Prevents legendary (gold) quality equipment from being affected by lower-priority rules. Place above sell and deconstruct rules to safeguard your best gear.",
  categoryId: "equipment",
  displayOrder: 5,
  action: "nothing",
  active: false,
  goal: "equip",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
