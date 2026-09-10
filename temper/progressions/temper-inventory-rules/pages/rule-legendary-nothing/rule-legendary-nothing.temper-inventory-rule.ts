import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.types.ts"

export const ruleLegendaryNothing = {
  id: "01a0728b-4fbd-78de-85c6-44b8f7930bb5",
  pageTypeSlug: "temper-inventory-rule",
  type: "temper-inventory-rule",
  slug: "rule-legendary-nothing",
  title: "Protect legendary gear",
  description:
    "Prevents legendary (gold) quality equipment from being affected by lower-priority rules. Place above sell and deconstruct rules to safeguard your best gear.",
  goal: "equip",
  conditions: "jsonl",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "equipment",
  displayOrder: 13,
  action: "nothing",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "legendary-nothing",
} as const satisfies TemperInventoryRule
