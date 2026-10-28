import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleTreasuresLegendaryWealth = {
  id: "01a183e3-42b3-7781-b789-f51fc20c59b0",
  type: "page-type/temper-inventory-rule",
  slug: "rule-treasures-legendary-wealth",
  title: "Store legendary treasures",
  description:
    "Moves legendary (gold) treasures that are not stolen to the Wealth housing storage container rather than selling them. Sits above the treasure sell rule.",
  goal: "temper-rule-goal/hoard",
  conditions: "jsonl",
  destination: "house-storage:Wealth",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/treasures",
  displayOrder: 69,
  action: "temper-item-action/move-to",
  active: true,
  ruleChangedAt: "2026-10-28T19:10:00.000Z",
  createdAt: "2026-10-28T19:01:11.475Z",
  updatedAt: "2026-10-28T19:01:11.475Z",
} as const satisfies TemperInventoryRule
