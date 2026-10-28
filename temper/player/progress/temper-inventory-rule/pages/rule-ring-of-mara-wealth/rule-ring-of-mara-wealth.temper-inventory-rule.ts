import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleRingOfMaraWealth = {
  id: "01a183f5-9f10-7bc1-adea-be38daf3d2a5",
  type: "page-type/temper-inventory-rule",
  slug: "rule-ring-of-mara-wealth",
  title: "Store the Ring of Mara",
  description:
    "Moves every Ring of Mara to the Wealth housing storage container, beside the gold treasures, and keeps those already there. Sits above the uncollected bind rule and the legendary gear protection; the rest of gold gear stays as it is.",
  goal: "temper-rule-goal/hoard",
  conditions: "jsonl",
  destination: "house-storage:Wealth",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/equipment",
  displayOrder: 15.45,
  action: "temper-item-action/move-to",
  active: true,
  ruleChangedAt: "2026-10-28T19:22:00.000Z",
  createdAt: "2026-10-28T19:21:14.767Z",
  updatedAt: "2026-10-28T19:21:14.767Z",
} as const satisfies TemperInventoryRule
