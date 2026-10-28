import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleSoulGemsEmptyStock = {
  id: "01a0728b-6d6f-7226-88d1-5d7267781a0e",
  type: "page-type/temper-inventory-rule",
  slug: "rule-soul-gems-empty-stock",
  title: "Stock 200 empty soul gems on every character and the bank, selling the rest",
  description:
    "Stocks 200 empty (white quality) soul gems on every character and 200 in the bank, and sells every other empty soul gem at a merchant. A character holding fewer than 200 withdraws up to 200 at the bank; a character holding more deposits what the others are short of and what the bank lacks of its 200, and sells only what is left after that. Filled soul gems are left to the soul gem stock automation, and crown soul gems are left as they are.",
  goal: "temper-rule-goal/task",
  conditions: "jsonl",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/soul-gems",
  displayOrder: 59,
  action: "temper-item-action/stock",
  active: true,
  ruleChangedAt: "2026-10-28T21:27:47.828Z",
  locked: true,
  destinationChain: "jsonl",
  createdAt: "2026-09-05T17:08:55.279Z",
  updatedAt: "2026-10-28T21:29:00.682Z",
} as const satisfies TemperInventoryRule
