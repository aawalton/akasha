import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleSoulGemsEmptyBank = {
  id: "01a0728b-6d6f-7226-88d1-5d7267781a0e",
  type: "page-type/temper-inventory-rule",
  slug: "rule-soul-gems-empty-bank",
  title: "Bank empty soul gems",
  description:
    "Deposits empty (white quality) soul gems in the bank. Filled and crown soul gems are kept.",
  goal: "temper-rule-goal/task",
  conditions: "jsonl",
  destination: "bank",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "temper-item-category-tree/soul-gems",
  displayOrder: 52,
  action: "temper-item-action/move-to",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "temper-rule-template/soul-gems-empty-bank",
} as const satisfies TemperInventoryRule
