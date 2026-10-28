import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleReconstructedCharacterBank = {
  id: "01a18472-f74a-76b2-95da-801cdd5c54db",
  type: "page-type/temper-inventory-rule",
  slug: "rule-reconstructed-character-bank",
  title: "Bank reconstructed gear no target build wants",
  description:
    "Moves reconstructed equipment a character carries to the bank when no character's target build wants it. Sits above the locked item protection, so gear a target build swapped out reaches the bank while still locked.",
  goal: "temper-rule-goal/hoard",
  conditions: "jsonl",
  destination: "bank",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/equipment",
  displayOrder: 4.3,
  action: "temper-item-action/move-to",
  active: true,
  ruleChangedAt: "2026-10-28T21:45:00.000Z",
  createdAt: "2026-10-28T21:38:09.352Z",
  updatedAt: "2026-10-28T21:38:09.352Z",
} as const satisfies TemperInventoryRule
