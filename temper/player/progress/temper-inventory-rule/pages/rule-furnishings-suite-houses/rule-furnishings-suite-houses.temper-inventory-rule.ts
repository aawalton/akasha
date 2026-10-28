import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleFurnishingsSuiteHouses = {
  id: "01a18415-b772-78b6-be97-3f14808b9e7e",
  type: "page-type/temper-inventory-rule",
  slug: "rule-furnishings-suite-houses",
  title: "Place Suite furnishings in houses",
  description:
    "Places Suite furnishings in Hunding's Palatial Hall, then Mathiisen Manor, as storage; what neither has room for stays in the furniture vault.",
  goal: "temper-rule-goal/hoard",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/furn-suite",
  displayOrder: 44.62,
  action: "temper-item-action/move-to",
  active: true,
  ruleChangedAt: "2026-10-28T19:55:00.000Z",
  destinationChain: "jsonl",
  createdAt: "2026-10-28T19:56:18.158Z",
  updatedAt: "2026-10-28T19:56:18.158Z",
} as const satisfies TemperInventoryRule
