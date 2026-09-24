import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const rule440d6e66 = {
  id: "01a0728a-f56b-71da-9bee-014f902d1b5a",
  type: "page-type/temper-inventory-rule",
  slug: "rule-440d6e66",
  title: "Counterfeit Pardon Edict → stock 10/char (justice WIP)",
  conditions: "jsonl",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/scrolls",
  displayOrder: 34,
  action: "temper-item-action/stock",
  active: true,
  updatedAt: "2026-06-03T03:46:58.890Z",
  destinationChain: "jsonl",
} as const satisfies TemperInventoryRule
