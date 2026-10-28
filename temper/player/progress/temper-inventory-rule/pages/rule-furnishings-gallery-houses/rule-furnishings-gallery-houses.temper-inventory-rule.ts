import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleFurnishingsGalleryHouses = {
  id: "01a18415-b771-7906-98a5-210d50c42b77",
  type: "page-type/temper-inventory-rule",
  slug: "rule-furnishings-gallery-houses",
  title: "Place Gallery furnishings in houses",
  description:
    "Places Gallery furnishings in Grand Gallery of Tamriel, then Antiquarian's Alpine Gallery, as storage; what neither has room for stays in the furniture vault.",
  goal: "temper-rule-goal/hoard",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/furn-gallery",
  displayOrder: 44.55,
  action: "temper-item-action/move-to",
  active: true,
  ruleChangedAt: "2026-10-28T19:55:00.000Z",
  destinationChain: "jsonl",
  createdAt: "2026-10-28T19:56:18.158Z",
  updatedAt: "2026-10-28T19:56:18.158Z",
} as const satisfies TemperInventoryRule
