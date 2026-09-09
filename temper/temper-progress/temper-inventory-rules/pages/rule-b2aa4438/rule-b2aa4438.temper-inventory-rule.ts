import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const ruleB2aa4438 = {
  id: "01a0728b-10d0-7563-b284-a2617536dffc",
  pageTypeSlug: "temper-inventory-rule",
  type: "temper-inventory-rule",
  slug: "rule-b2aa4438",
  title: "Store quality potions",
  description:
    "Moves blue (Superior) and higher non-stolen potions to the Potions and Poisons housing storage container, keeping bulky quality potions out of the backpack. Sits above the crafted-consumables protection so crafted quality potions are relocated rather than left loose.",
  conditions: "jsonl",
  destination: "house-storage:4674",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "potions",
  displayOrder: 21,
  action: "move-to",
  active: true,
  updatedAt: "2026-06-01T12:18:15.323Z",
} as const satisfies TemperInventoryRule
