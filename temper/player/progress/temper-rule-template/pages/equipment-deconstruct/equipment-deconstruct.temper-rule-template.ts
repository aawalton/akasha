import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const equipmentDeconstruct = {
  id: "019e3104-261c-7239-bced-7a7c2ac03bce",
  type: "page-type/temper-rule-template",
  slug: "equipment-deconstruct",
  title: "Deconstruct leftover equipment",
  key: "equipment-deconstruct",
  description:
    "Deconstructs non-crafted equipment that wasn't caught by higher-priority rules. Place below equip, research, and inspire rules to only deconstruct what's left over.",
  categoryId: "temper-item-category-tree/equipment",
  displayOrder: 27,
  action: "temper-item-action/deconstruct",
  active: false,
  goal: "temper-rule-goal/hoard",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
