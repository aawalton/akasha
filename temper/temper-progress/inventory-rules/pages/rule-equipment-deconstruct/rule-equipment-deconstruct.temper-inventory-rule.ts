import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const ruleEquipmentDeconstruct = {
  id: "01a0728b-2e7d-7daa-bb9a-488382afbb59",
  pageTypeSlug: "temper-inventory-rule",
  slug: "rule-equipment-deconstruct",
  title: "Deconstruct leftover equipment",
  description:
    "Deconstructs non-crafted equipment that wasn't caught by higher-priority rules. Place below equip, research, and inspire rules to only deconstruct what's left over.",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "equipment",
  displayOrder: 54,
  action: "deconstruct",
  active: true,
  goal: "hoard",
  locked: true,
  fromTemplate: "equipment-deconstruct",
  conditions: "jsonl",
} as const satisfies TemperInventoryRule
