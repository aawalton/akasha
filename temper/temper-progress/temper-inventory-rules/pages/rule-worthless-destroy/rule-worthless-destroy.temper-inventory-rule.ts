import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const ruleWorthlessDestroy = {
  id: "01a0728b-8ec3-7fdb-ad57-ed1a0510afb2",
  pageTypeSlug: "temper-inventory-rule",
  type: "temper-inventory-rule",
  slug: "rule-worthless-destroy",
  title: "Destroy worthless items",
  description:
    "Destroys normal (white) quality items that have no guild store value and no merchant value. Place at the very bottom — only items not caught by any higher-priority rule are destroyed.",
  goal: "destroy",
  conditions: "jsonl",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "all",
  displayOrder: 75,
  action: "destroy",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "worthless-destroy",
} as const satisfies TemperInventoryRule
