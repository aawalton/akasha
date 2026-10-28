import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleLegendaryCharacterBank = {
  id: "01a18472-9524-7e54-80d1-3f530401307d",
  type: "page-type/temper-inventory-rule",
  slug: "rule-legendary-character-bank",
  title: "Bank legendary gear no target build wants",
  description:
    "Moves legendary or better equipment a character carries to the bank when no character's target build wants it. Sits above the locked item protection, so gear a target build swapped out reaches the bank while still locked.",
  goal: "temper-rule-goal/hoard",
  conditions: "jsonl",
  destination: "bank",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/equipment",
  displayOrder: 4.1,
  action: "temper-item-action/move-to",
  active: true,
  ruleChangedAt: "2026-10-28T21:45:00.000Z",
  createdAt: "2026-10-28T21:37:44.227Z",
  updatedAt: "2026-10-28T21:37:44.227Z",
} as const satisfies TemperInventoryRule
