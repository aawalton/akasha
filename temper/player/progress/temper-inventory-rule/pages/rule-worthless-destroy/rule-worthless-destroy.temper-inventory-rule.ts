import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleWorthlessDestroy = {
  id: "01a0728b-8ec3-7fdb-ad57-ed1a0510afb2",
  type: "page-type/temper-inventory-rule",
  slug: "rule-worthless-destroy",
  title: "Destroy worthless items",
  description:
    "Destroys normal (white) quality items whose guild store value is at or below zero, which an unknown guild store value satisfies. Merchant value is not consulted. Place at the very bottom — only items not caught by any higher-priority rule are destroyed.",
  goal: "temper-rule-goal/destroy",
  conditions: "jsonl",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/all",
  displayOrder: 77,
  action: "temper-item-action/destroy",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "temper-rule-template/worthless-destroy",
} as const satisfies TemperInventoryRule
