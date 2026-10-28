import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleFurnishingsParlorHouses = {
  id: "01a18415-b771-7f5a-a77d-5b331b59a2e9",
  type: "page-type/temper-inventory-rule",
  slug: "rule-furnishings-parlor-houses",
  title: "Place Parlor furnishings in houses",
  description:
    "Places Parlor furnishings in Linchal Grand Manor, then Mathiisen Manor, as storage; what neither has room for stays in the furniture vault.",
  goal: "temper-rule-goal/hoard",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/furn-parlor",
  displayOrder: 44.56,
  action: "temper-item-action/move-to",
  active: true,
  ruleChangedAt: "2026-10-28T19:55:00.000Z",
  destinationChain: "jsonl",
  createdAt: "2026-10-28T19:56:18.158Z",
  updatedAt: "2026-10-28T19:56:18.158Z",
} as const satisfies TemperInventoryRule
