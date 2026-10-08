import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleTransmutedNothing = {
  id: "01a0728b-6d6f-78a2-8c9b-4d79e20601a6",
  type: "page-type/temper-inventory-rule",
  slug: "rule-transmuted-nothing",
  title: "Protect transmuted gear",
  description:
    "Prevents transmuted equipment from being affected by lower-priority rules. Transmuted gear represents a transmute crystal investment.",
  goal: "temper-rule-goal/equip",
  conditions: "jsonl",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/equipment",
  displayOrder: 32,
  action: "temper-item-action/nothing",
  active: true,
  ruleChangedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  createdAt: "2026-09-05T17:08:55.279Z",
  updatedAt: "2026-10-08T14:43:46.000Z",
} as const satisfies TemperInventoryRule
