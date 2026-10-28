import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleFurnishingsStructuresHouses = {
  id: "01a18415-b772-7e59-b0ac-eca5d54289d8",
  type: "page-type/temper-inventory-rule",
  slug: "rule-furnishings-structures-houses",
  title: "Place Structures furnishings in houses",
  description:
    "Places Structures furnishings in Earthtear Cavern, then Hakkvild's High Hall, as storage; what neither has room for stays in the furniture vault.",
  goal: "temper-rule-goal/hoard",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/furn-structures",
  displayOrder: 44.6,
  action: "temper-item-action/move-to",
  active: true,
  ruleChangedAt: "2026-10-28T19:55:00.000Z",
  destinationChain: "jsonl",
  createdAt: "2026-10-28T19:56:18.158Z",
  updatedAt: "2026-10-28T19:56:18.158Z",
} as const satisfies TemperInventoryRule
