import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleUncollectedBind = {
  id: "01a11bf0-dd8a-7398-a33d-af9e369671a0",
  type: "page-type/temper-inventory-rule",
  slug: "rule-uncollected-bind",
  title: "Bind uncollected set pieces",
  description:
    "Binds every set piece the account's set collection lacks, so the piece unlocks in the collection. Placed above the rules that keep, sell, list or deconstruct gear, so a new piece is bound before any of them acts on it.",
  goal: "temper-rule-goal/unlock",
  conditions: "jsonl",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/equipment",
  displayOrder: 15.5,
  action: "temper-item-action/bind",
  active: true,
  updatedAt: "2026-10-08T14:35:10.000Z",
} as const satisfies TemperInventoryRule
