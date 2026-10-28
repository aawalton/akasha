import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleFurnishingsCourtyardHouses = {
  id: "01a18415-b770-71ec-aba2-b81294d20988",
  type: "page-type/temper-inventory-rule",
  slug: "rule-furnishings-courtyard-houses",
  title: "Place Courtyard furnishings in houses",
  description:
    "Places Courtyard furnishings in Serenity Falls Estate, then Gladesong Arboretum, as storage; what neither has room for stays in the furniture vault.",
  goal: "temper-rule-goal/hoard",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/furn-courtyard",
  displayOrder: 44.58,
  action: "temper-item-action/move-to",
  active: true,
  ruleChangedAt: "2026-10-28T19:55:00.000Z",
  destinationChain: "jsonl",
  createdAt: "2026-10-28T19:56:18.158Z",
  updatedAt: "2026-10-28T19:56:18.158Z",
} as const satisfies TemperInventoryRule
