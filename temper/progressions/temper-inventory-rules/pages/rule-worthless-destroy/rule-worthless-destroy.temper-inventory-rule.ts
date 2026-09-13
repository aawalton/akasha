import type { TemperInventoryRule } from "akasha/temper/progressions/temper-inventory-rules/temper-inventory-rule.page-type.types.ts"

export const ruleWorthlessDestroy = {
  id: "01a0728b-8ec3-7fdb-ad57-ed1a0510afb2",
  type: "temper-inventory-rule",
  slug: "rule-worthless-destroy",
  title: "Destroy worthless items",
  description:
    "Destroys normal (white) quality items whose guild store value is at or below zero, which an unknown guild store value satisfies. Merchant value is not consulted. Place at the very bottom — only items not caught by any higher-priority rule are destroyed.",
  goal: "destroy",
  conditions: "jsonl",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "all",
  displayOrder: 76,
  action: "destroy",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "worthless-destroy",
} as const satisfies TemperInventoryRule
