import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleCraftedJewelryDeconstruct = {
  id: "01a183d4-0a3e-750a-b62c-da0fd23436cb",
  type: "page-type/temper-inventory-rule",
  slug: "rule-crafted-jewelry-deconstruct",
  title: "Deconstruct old crafted jewelry below blue",
  description:
    "Deconstructs crafted white and green jewelry in the backpack or bank that was crafted before today and that no daily crafting writ still held asks for. Blue and better crafted jewelry falls through to the crafted gear protection below.",
  goal: "temper-rule-goal/hoard",
  conditions: "jsonl",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/jewelry",
  displayOrder: 16.4,
  action: "temper-item-action/deconstruct",
  active: true,
  ruleChangedAt: "2026-10-28T18:45:00.000Z",
  createdAt: "2026-10-28T18:44:33.980Z",
  updatedAt: "2026-10-28T18:44:33.980Z",
} as const satisfies TemperInventoryRule
