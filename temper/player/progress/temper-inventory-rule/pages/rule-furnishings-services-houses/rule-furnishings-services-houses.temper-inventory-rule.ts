import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleFurnishingsServicesHouses = {
  id: "01a18415-b772-75b1-a1f7-af0668970f3f",
  type: "page-type/temper-inventory-rule",
  slug: "rule-furnishings-services-houses",
  title: "Place Services furnishings in houses",
  description:
    "Places Services furnishings in Forgemaster Falls, then Earthtear Cavern, as storage; what neither has room for stays in the furniture vault.",
  goal: "temper-rule-goal/hoard",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/furn-services",
  displayOrder: 44.59,
  action: "temper-item-action/move-to",
  active: true,
  ruleChangedAt: "2026-10-28T19:55:00.000Z",
  destinationChain: "jsonl",
  createdAt: "2026-10-28T19:56:18.158Z",
  updatedAt: "2026-10-28T19:56:18.158Z",
} as const satisfies TemperInventoryRule
