import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleB5b7365e = {
  id: "01a0728b-10d0-7097-8b5d-be99c850cbd4",
  type: "page-type/temper-inventory-rule",
  slug: "rule-b5b7365e",
  title: "Store quality food",
  description:
    "Moves blue (Superior) and higher non-stolen food to the Food and Drink housing storage container, keeping bulky quality food out of the backpack. Sits above the crafted-consumables protection so crafted quality food is relocated rather than left loose.",
  conditions: "jsonl",
  destination: "house-storage:Food and Drink",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/food",
  displayOrder: 20,
  action: "temper-item-action/move-to",
  active: true,
  ruleChangedAt: "2026-06-01T12:11:50.044Z",
  createdAt: "2026-09-05T17:08:31.568Z",
  updatedAt: "2026-10-10T14:27:58.208Z",
} as const satisfies TemperInventoryRule
