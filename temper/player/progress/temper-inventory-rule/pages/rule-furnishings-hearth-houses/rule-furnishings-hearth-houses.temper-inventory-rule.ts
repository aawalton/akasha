import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleFurnishingsHearthHouses = {
  id: "01a18415-b771-7684-a807-09c234fe8d32",
  type: "page-type/temper-inventory-rule",
  slug: "rule-furnishings-hearth-houses",
  title: "Place Hearth furnishings in houses",
  description:
    "Places Hearth furnishings in Hunding's Palatial Hall, then Mathiisen Manor, as storage; what neither has room for stays in the furniture vault.",
  goal: "temper-rule-goal/hoard",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/furn-hearth",
  displayOrder: 44.57,
  action: "temper-item-action/move-to",
  active: true,
  ruleChangedAt: "2026-10-28T19:55:00.000Z",
  destinationChain: "jsonl",
  createdAt: "2026-10-28T19:56:18.158Z",
  updatedAt: "2026-10-28T19:56:18.158Z",
} as const satisfies TemperInventoryRule
