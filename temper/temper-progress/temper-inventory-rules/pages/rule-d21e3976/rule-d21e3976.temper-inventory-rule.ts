import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const ruleD21e3976 = {
  id: "01a0728b-2e7c-700a-b579-0c6a247a52ef",
  pageTypeSlug: "temper-inventory-rule",
  type: "temper-inventory-rule",
  slug: "rule-d21e3976",
  title: "Store quality drink",
  description:
    "Moves blue (Superior) and higher non-stolen drink to the Food and Drink housing storage container, keeping bulky quality drink out of the backpack. Sits above the crafted-consumables protection so crafted quality drink is relocated rather than left loose.",
  conditions: "jsonl",
  destination: "house-storage:4675",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "drink",
  displayOrder: 16,
  action: "move-to",
  active: true,
  updatedAt: "2026-06-01T12:11:49.762Z",
} as const satisfies TemperInventoryRule
