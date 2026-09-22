import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleLegendaryNothing = {
  id: "01a0728b-4fbd-78de-85c6-44b8f7930bb5",
  type: "page-type/temper-inventory-rule",
  slug: "rule-legendary-nothing",
  title: "Protect legendary gear",
  description:
    "Prevents legendary (gold) quality equipment from being affected by lower-priority rules. Place above sell and deconstruct rules to safeguard your best gear.",
  goal: "temper-rule-goal/equip",
  conditions: "jsonl",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "temper-item-category-tree/equipment",
  displayOrder: 13,
  action: "temper-item-action/nothing",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "temper-rule-template/legendary-nothing",
} as const satisfies TemperInventoryRule
