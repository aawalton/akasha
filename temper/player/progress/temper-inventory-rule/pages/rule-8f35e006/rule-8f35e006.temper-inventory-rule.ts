import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const rule8f35e006 = {
  id: "01a0728a-f56e-7d26-a297-78f312730d8e",
  type: "page-type/temper-inventory-rule",
  slug: "rule-8f35e006",
  title: "Stock Crown tri-pots on Erin (200, rest banked)",
  description:
    "Gap B1: bank is the deliberate stock home (2-3 chars at a time, manual pulls). Replaces the lock. Must run before f0ce7528.",
  conditions: "jsonl",
  stockScope: "any-character",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/potions",
  displayOrder: 20,
  action: "temper-item-action/stock",
  active: true,
  updatedAt: "2026-09-27T15:27:56.493Z",
  destinationChain: "jsonl",
} as const satisfies TemperInventoryRule
