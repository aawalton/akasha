import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleCraftedArmorDeconstruct = {
  id: "01a183d4-0a3d-7e61-b2e0-e7335d32347e",
  type: "page-type/temper-inventory-rule",
  slug: "rule-crafted-armor-deconstruct",
  title: "Deconstruct old crafted armor below purple",
  description:
    "Deconstructs crafted white, green and blue armor and shields in the backpack or bank that were crafted before today and that no daily crafting writ still held asks for. Purple and better crafted armor falls through to the crafted gear protection below.",
  goal: "temper-rule-goal/hoard",
  conditions: "jsonl",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/armor",
  displayOrder: 16.5,
  action: "temper-item-action/deconstruct",
  active: true,
  ruleChangedAt: "2026-10-28T18:45:00.000Z",
  createdAt: "2026-10-28T18:44:33.980Z",
  updatedAt: "2026-10-28T18:44:33.980Z",
} as const satisfies TemperInventoryRule
