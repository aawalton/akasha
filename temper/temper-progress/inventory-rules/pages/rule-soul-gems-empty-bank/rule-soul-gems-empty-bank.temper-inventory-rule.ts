import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const ruleSoulGemsEmptyBank = {
  id: "01a0728b-6d6f-7226-88d1-5d7267781a0e",
  pageTypeSlug: "temper-inventory-rule",
  slug: "rule-soul-gems-empty-bank",
  title: "Bank empty soul gems",
  description:
    "Deposits empty (white quality) soul gems in the bank. Filled and crown soul gems are kept.",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "soul-gems",
  displayOrder: 51,
  action: "move-to",
  active: true,
  goal: "task",
  locked: true,
  fromTemplate: "soul-gems-empty-bank",
  destination: "bank",
  conditions: "jsonl",
} as const satisfies TemperInventoryRule
