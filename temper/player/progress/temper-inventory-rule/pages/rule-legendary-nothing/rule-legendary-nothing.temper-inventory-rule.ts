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
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/equipment",
  displayOrder: 16,
  action: "temper-item-action/nothing",
  active: true,
  ruleChangedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  createdAt: "2026-09-05T17:08:47.677Z",
  updatedAt: "2026-10-08T14:43:46.000Z",
} as const satisfies TemperInventoryRule
