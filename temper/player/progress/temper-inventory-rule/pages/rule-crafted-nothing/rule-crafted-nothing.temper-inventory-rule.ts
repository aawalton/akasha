import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleCraftedNothing = {
  id: "01a0728b-10d1-7e0b-baf2-a208264ffd33",
  type: "page-type/temper-inventory-rule",
  slug: "rule-crafted-nothing",
  title: "Protect crafted gear",
  description:
    "Prevents crafted equipment from being affected by lower-priority rules. Useful for keeping gear you've invested materials into.",
  goal: "temper-rule-goal/equip",
  conditions: "jsonl",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/equipment",
  displayOrder: 14,
  action: "temper-item-action/nothing",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
} as const satisfies TemperInventoryRule
