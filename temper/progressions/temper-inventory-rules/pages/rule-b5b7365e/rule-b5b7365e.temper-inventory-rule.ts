import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.types.ts"

export const ruleB5b7365e = {
  id: "01a0728b-10d0-7097-8b5d-be99c850cbd4",
  pageTypeSlug: "temper-inventory-rule",
  type: "temper-inventory-rule",
  slug: "rule-b5b7365e",
  title: "Store quality food",
  description:
    "Moves blue (Superior) and higher non-stolen food to the Food and Drink housing storage container, keeping bulky quality food out of the backpack. Sits above the crafted-consumables protection so crafted quality food is relocated rather than left loose.",
  conditions: "jsonl",
  destination: "house-storage:4675",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "food",
  displayOrder: 15,
  action: "move-to",
  active: true,
  updatedAt: "2026-06-01T12:11:50.044Z",
} as const satisfies TemperInventoryRule
