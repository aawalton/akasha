import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleFurnishingsMiscellaneousHouses = {
  id: "01a18415-b771-7a9d-955f-b54825006296",
  type: "page-type/temper-inventory-rule",
  slug: "rule-furnishings-miscellaneous-houses",
  title: "Place Miscellaneous furnishings in houses",
  description:
    "Places Miscellaneous furnishings in Earthtear Cavern, then Hakkvild's High Hall, as storage; what neither has room for stays in the furniture vault.",
  goal: "temper-rule-goal/hoard",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/furn-miscellaneous",
  displayOrder: 44.64,
  action: "temper-item-action/move-to",
  active: true,
  ruleChangedAt: "2026-10-28T19:55:00.000Z",
  destinationChain: "jsonl",
  createdAt: "2026-10-28T19:56:18.158Z",
  updatedAt: "2026-10-28T19:56:18.158Z",
} as const satisfies TemperInventoryRule
