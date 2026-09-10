import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.types.ts"

export const ruleEquipmentDeconstruct = {
  id: "01a0728b-2e7d-7daa-bb9a-488382afbb59",
  pageTypeSlug: "temper-inventory-rule",
  type: "temper-inventory-rule",
  slug: "rule-equipment-deconstruct",
  title: "Deconstruct leftover equipment",
  description:
    "Deconstructs non-crafted equipment that wasn't caught by higher-priority rules. Place below equip, research, and inspire rules to only deconstruct what's left over.",
  goal: "hoard",
  conditions: "jsonl",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "equipment",
  displayOrder: 54,
  action: "deconstruct",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "equipment-deconstruct",
} as const satisfies TemperInventoryRule
