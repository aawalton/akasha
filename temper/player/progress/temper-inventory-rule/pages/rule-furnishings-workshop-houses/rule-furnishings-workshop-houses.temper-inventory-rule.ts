import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleFurnishingsWorkshopHouses = {
  id: "01a18415-b772-7d8f-8cec-9508ea30778e",
  type: "page-type/temper-inventory-rule",
  slug: "rule-furnishings-workshop-houses",
  title: "Place Workshop furnishings in houses",
  description:
    "Places Workshop furnishings in Forgemaster Falls, then Hakkvild's High Hall, as storage; what neither has room for stays in the furniture vault.",
  goal: "temper-rule-goal/hoard",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/furn-workshop",
  displayOrder: 44.61,
  action: "temper-item-action/move-to",
  active: true,
  ruleChangedAt: "2026-10-28T19:55:00.000Z",
  destinationChain: "jsonl",
  createdAt: "2026-10-28T19:56:18.158Z",
  updatedAt: "2026-10-28T19:56:18.158Z",
} as const satisfies TemperInventoryRule
