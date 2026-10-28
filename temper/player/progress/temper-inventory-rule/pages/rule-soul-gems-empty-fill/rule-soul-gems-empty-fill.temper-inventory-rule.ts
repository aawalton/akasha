import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleSoulGemsEmptyFill = {
  id: "01a0728b-6d6f-7226-88d1-5d7267781a0e",
  type: "page-type/temper-inventory-rule",
  slug: "rule-soul-gems-empty-fill",
  title: "Stock 200 empty soul gems on every character",
  description:
    "Stocks 200 empty (white quality) soul gems on every character, so every character fills them by Soul Trap in the field, and banks every other empty soul gem. At the bank a character holding fewer than 200 withdraws up to 200, and a character holding more deposits the extra. Filled soul gems are left to the soul gem stock automation.",
  goal: "temper-rule-goal/task",
  conditions: "jsonl",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/soul-gems",
  displayOrder: 59,
  action: "temper-item-action/stock",
  active: true,
  ruleChangedAt: "2026-10-28T20:58:32.861Z",
  locked: true,
  destinationChain: "jsonl",
  createdAt: "2026-09-05T17:08:55.279Z",
  updatedAt: "2026-10-28T21:01:05.167Z",
} as const satisfies TemperInventoryRule
