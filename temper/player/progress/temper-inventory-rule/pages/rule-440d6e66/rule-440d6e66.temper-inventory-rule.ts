import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const rule440d6e66 = {
  id: "01a0728a-f56b-71da-9bee-014f902d1b5a",
  type: "page-type/temper-inventory-rule",
  slug: "rule-440d6e66",
  title: "Counterfeit Pardon Edict → stock 10/char",
  conditions: "jsonl",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/scrolls",
  displayOrder: 40,
  action: "temper-item-action/stock",
  active: true,
  ruleChangedAt: "2026-10-24T16:27:39.000Z",
  destinationChain: "jsonl",
  createdAt: "2026-09-05T17:08:24.555Z",
  updatedAt: "2026-10-24T16:27:51.914Z",
} as const satisfies TemperInventoryRule
