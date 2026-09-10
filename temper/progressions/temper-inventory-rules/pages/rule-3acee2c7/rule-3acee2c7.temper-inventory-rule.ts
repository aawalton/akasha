import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.types.ts"

export const rule3acee2c7 = {
  id: "01a0728a-d6fe-779d-9a67-78895194f7f3",
  pageTypeSlug: "temper-inventory-rule",
  type: "temper-inventory-rule",
  slug: "rule-3acee2c7",
  title: "Sell known recipes",
  description:
    "Disposal spine step 5: known-by-all recipes to merchant; valuable ones list first via fc1c9638. Closes gap A1.",
  conditions: "jsonl",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "recipes",
  displayOrder: 77,
  action: "sell",
  active: true,
  updatedAt: "2026-07-05T13:20:37.492Z",
} as const satisfies TemperInventoryRule
