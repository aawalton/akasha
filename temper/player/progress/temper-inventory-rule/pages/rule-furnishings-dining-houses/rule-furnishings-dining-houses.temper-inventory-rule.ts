import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleFurnishingsDiningHouses = {
  id: "01a18415-b770-7234-9033-1a14c8dc8796",
  type: "page-type/temper-inventory-rule",
  slug: "rule-furnishings-dining-houses",
  title: "Place Dining furnishings in houses",
  description:
    "Places Dining furnishings in Hunding's Palatial Hall, then Mathiisen Manor, as storage; what neither has room for stays in the furniture vault.",
  goal: "temper-rule-goal/hoard",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/furn-dining",
  displayOrder: 44.63,
  action: "temper-item-action/move-to",
  active: true,
  ruleChangedAt: "2026-10-28T19:55:00.000Z",
  destinationChain: "jsonl",
  createdAt: "2026-10-28T19:56:18.158Z",
  updatedAt: "2026-10-28T19:56:18.158Z",
} as const satisfies TemperInventoryRule
