import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleF48e4c64 = {
  id: "01a0728b-2e7d-7785-8700-5b97ccef538d",
  type: "page-type/temper-inventory-rule",
  slug: "rule-f48e4c64",
  title: "Store quality poisons",
  description:
    "Moves blue (Superior) and higher non-stolen poisons to the Potions and Poisons housing storage container, keeping bulky quality poisons out of the backpack. Sits above the crafted-consumables protection so crafted quality poisons are relocated rather than left loose.",
  conditions: "jsonl",
  destination: "house-storage:Potions and Poisons",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/poisons",
  displayOrder: 29,
  action: "temper-item-action/move-to",
  active: true,
  ruleChangedAt: "2026-06-01T12:18:15.614Z",
  createdAt: "2026-09-05T17:08:39.165Z",
  updatedAt: "2026-10-10T14:27:58.208Z",
} as const satisfies TemperInventoryRule
