import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const equipmentDeconstruct = {
  id: "019e3104-261c-7239-bced-7a7c2ac03bce",
  pageTypeSlug: "temper-rule-template",
  slug: "equipment-deconstruct",
  title: "Deconstruct leftover equipment",
  key: "equipment-deconstruct",
  description:
    "Deconstructs non-crafted equipment that wasn't caught by higher-priority rules. Place below equip, research, and inspire rules to only deconstruct what's left over.",
  categoryId: "equipment",
  displayOrder: 26,
  action: "deconstruct",
  active: false,
  goal: "hoard",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
