import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const ruleCraftedNothing = {
  id: "01a0728b-10d1-7e0b-baf2-a208264ffd33",
  pageTypeSlug: "temper-inventory-rule",
  slug: "rule-crafted-nothing",
  title: "Protect crafted gear",
  description:
    "Prevents crafted equipment from being affected by lower-priority rules. Useful for keeping gear you've invested materials into.",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "equipment",
  displayOrder: 14,
  action: "nothing",
  active: true,
  goal: "equip",
  locked: true,
  fromTemplate: "crafted-nothing",
  conditions: "jsonl",
} as const satisfies TemperInventoryRule
