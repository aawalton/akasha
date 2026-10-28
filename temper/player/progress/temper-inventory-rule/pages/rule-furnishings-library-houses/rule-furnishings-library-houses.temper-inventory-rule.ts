import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleFurnishingsLibraryHouses = {
  id: "01a18414-4d2b-7861-ab1b-940c06af3e06",
  type: "page-type/temper-inventory-rule",
  slug: "rule-furnishings-library-houses",
  title: "Place Library furnishings in houses",
  description:
    "Places Library furnishings in Tower of Unutterable Truths, then Antiquarian's Alpine Gallery, as storage; what neither has room for stays in the furniture vault.",
  goal: "temper-rule-goal/hoard",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/furn-library",
  displayOrder: 44.51,
  action: "temper-item-action/move-to",
  active: true,
  ruleChangedAt: "2026-10-28T19:55:00.000Z",
  destinationChain: "jsonl",
  createdAt: "2026-10-28T19:54:45.418Z",
  updatedAt: "2026-10-28T19:54:45.418Z",
} as const satisfies TemperInventoryRule
