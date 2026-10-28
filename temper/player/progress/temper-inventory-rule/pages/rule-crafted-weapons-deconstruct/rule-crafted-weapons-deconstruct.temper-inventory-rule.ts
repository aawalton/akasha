import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleCraftedWeaponsDeconstruct = {
  id: "01a183d4-0a3e-7542-b6b4-6cab87c39d71",
  type: "page-type/temper-inventory-rule",
  slug: "rule-crafted-weapons-deconstruct",
  title: "Deconstruct old crafted weapons below purple",
  description:
    "Deconstructs crafted white, green and blue weapons in the backpack or bank that were crafted before today and that no daily crafting writ still held asks for. Purple and better crafted weapons fall through to the crafted gear protection below.",
  goal: "temper-rule-goal/hoard",
  conditions: "jsonl",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/weapons",
  displayOrder: 16.6,
  action: "temper-item-action/deconstruct",
  active: true,
  ruleChangedAt: "2026-10-28T18:45:00.000Z",
  createdAt: "2026-10-28T18:44:33.980Z",
  updatedAt: "2026-10-28T18:44:33.980Z",
} as const satisfies TemperInventoryRule
