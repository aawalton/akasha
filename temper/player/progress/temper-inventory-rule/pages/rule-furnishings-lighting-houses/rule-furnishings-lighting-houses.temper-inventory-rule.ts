import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleFurnishingsLightingHouses = {
  id: "01a18415-b771-7263-bafa-725b1fb36419",
  type: "page-type/temper-inventory-rule",
  slug: "rule-furnishings-lighting-houses",
  title: "Place Lighting furnishings in houses",
  description:
    "Places Lighting furnishings in Fogbreak Lighthouse, then Antiquarian's Alpine Gallery, as storage; what neither has room for stays in the furniture vault.",
  goal: "temper-rule-goal/hoard",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/furn-lighting",
  displayOrder: 44.52,
  action: "temper-item-action/move-to",
  active: true,
  ruleChangedAt: "2026-10-28T19:55:00.000Z",
  destinationChain: "jsonl",
  createdAt: "2026-10-28T19:56:18.158Z",
  updatedAt: "2026-10-28T19:56:18.158Z",
} as const satisfies TemperInventoryRule
