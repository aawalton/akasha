import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleCraftedCharacterBank = {
  id: "01a18472-f749-7276-9fe0-f42be9ad4a2d",
  type: "page-type/temper-inventory-rule",
  slug: "rule-crafted-character-bank",
  title: "Bank crafted gear no target build wants",
  description:
    "Moves crafted equipment a character carries to the bank when no character's target build wants it and no daily crafting writ the character holds asks for it. Sits above the locked item protection, so gear a target build swapped out reaches the bank while still locked.",
  goal: "temper-rule-goal/hoard",
  conditions: "jsonl",
  destination: "bank",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/equipment",
  displayOrder: 4.2,
  action: "temper-item-action/move-to",
  active: true,
  ruleChangedAt: "2026-10-30T13:27:59.000Z",
  createdAt: "2026-10-28T21:38:09.352Z",
  updatedAt: "2026-10-30T13:28:38.022Z",
} as const satisfies TemperInventoryRule
