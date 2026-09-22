import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const rule8edf08cb = {
  id: "01a0728a-f56e-7636-b9da-b21d99e345f5",
  type: "page-type/temper-inventory-rule",
  slug: "rule-8edf08cb",
  title: "Sell learned style pages",
  description: "Disposal spine step 5: learned + sellable + sub-list-line. Closes gap A3.",
  conditions: "jsonl",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "temper-item-category-tree/style-pages",
  displayOrder: 80,
  action: "temper-item-action/sell",
  active: true,
  updatedAt: "2026-07-05T13:20:38.006Z",
} as const satisfies TemperInventoryRule
