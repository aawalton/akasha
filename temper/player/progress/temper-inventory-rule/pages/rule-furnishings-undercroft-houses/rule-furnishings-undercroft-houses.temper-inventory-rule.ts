import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleFurnishingsUndercroftHouses = {
  id: "01a18415-b772-75a8-a80a-0edfe1a163a4",
  type: "page-type/temper-inventory-rule",
  slug: "rule-furnishings-undercroft-houses",
  title: "Place Undercroft furnishings in houses",
  description:
    "Places Undercroft furnishings in Kthendral Deep Mines, then Earthtear Cavern, as storage; what neither has room for stays in the furniture vault.",
  goal: "temper-rule-goal/hoard",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/furn-undercroft",
  displayOrder: 44.54,
  action: "temper-item-action/move-to",
  active: true,
  ruleChangedAt: "2026-10-28T19:55:00.000Z",
  destinationChain: "jsonl",
  createdAt: "2026-10-28T19:56:18.158Z",
  updatedAt: "2026-10-28T19:56:18.158Z",
} as const satisfies TemperInventoryRule
