import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const ruleF48e4c64 = {
  id: "01a0728b-2e7d-7785-8700-5b97ccef538d",
  pageTypeSlug: "temper-inventory-rule",
  type: "temper-inventory-rule",
  slug: "rule-f48e4c64",
  title: "Store quality poisons",
  description:
    "Moves blue (Superior) and higher non-stolen poisons to the Potions and Poisons housing storage container, keeping bulky quality poisons out of the backpack. Sits above the crafted-consumables protection so crafted quality poisons are relocated rather than left loose.",
  conditions: "jsonl",
  destination: "house-storage:4674",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "poisons",
  displayOrder: 22,
  action: "move-to",
  active: true,
  updatedAt: "2026-06-01T12:18:15.614Z",
} as const satisfies TemperInventoryRule
