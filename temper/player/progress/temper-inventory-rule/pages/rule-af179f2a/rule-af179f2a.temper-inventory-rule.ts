import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleAf179f2a = {
  id: "01a0e37e-3536-7893-b3f7-5437221460a5",
  type: "page-type/temper-inventory-rule",
  slug: "rule-af179f2a",
  title: "Never open map, writ and survey containers",
  description:
    "Unknown writs, unidentified survey reports and unopened treasure maps are kept unopened; the open rule below never reaches them.",
  conditions: "jsonl",
  accountPage: "temper-account/alanarre",
  displayOrder: 13,
  action: "temper-item-action/nothing",
  active: true,
  updatedAt: "2026-09-27T15:31:31.729Z",
  categoryId: "temper-item-category-tree/containers",
} as const satisfies TemperInventoryRule
