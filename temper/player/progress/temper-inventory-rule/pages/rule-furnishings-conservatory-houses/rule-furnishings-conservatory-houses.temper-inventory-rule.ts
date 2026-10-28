import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleFurnishingsConservatoryHouses = {
  id: "01a18415-b76f-7c7a-b050-69b0a747e122",
  type: "page-type/temper-inventory-rule",
  slug: "rule-furnishings-conservatory-houses",
  title: "Place Conservatory furnishings in houses",
  description:
    "Places Conservatory furnishings in Druidspring Conservatory, then Gladesong Arboretum, as storage; what neither has room for stays in the furniture vault.",
  goal: "temper-rule-goal/hoard",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/furn-conservatory",
  displayOrder: 44.53,
  action: "temper-item-action/move-to",
  active: true,
  ruleChangedAt: "2026-10-28T19:55:00.000Z",
  destinationChain: "jsonl",
  createdAt: "2026-10-28T19:56:18.158Z",
  updatedAt: "2026-10-28T19:56:18.158Z",
} as const satisfies TemperInventoryRule
