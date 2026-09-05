import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const ruleFc1c9638 = {
  id: "01a0728b-2e7d-7b22-add5-e5717834cb9f",
  pageTypeSlug: "temper-inventory-rule",
  slug: "rule-fc1c9638",
  title: "List known valuable recipes on guild store",
  description:
    "Lists recipes you've already learned (known) with guild-store value >= 5000g. Raised from 1000 to match the uniform 5000g list line; known recipes under 5000g now route to the generic vendor-sell rule.",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "recipes",
  displayOrder: 69,
  action: "list",
  active: true,
  goal: "sell",
  destination: "character:8796093022338107",
  conditions: "jsonl",
} as const satisfies TemperInventoryRule
