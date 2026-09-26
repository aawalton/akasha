import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleAfc151c4 = {
  id: "01a0decd-5991-7418-a534-b878318a37ba",
  type: "page-type/temper-inventory-rule",
  slug: "rule-afc151c4",
  title: "Launder stolen containers",
  description: "Launders stolen containers before any container rule moves them.",
  goal: "temper-rule-goal/hoard",
  conditions: "jsonl",
  accountPage: "temper-account/alanarre",
  displayOrder: 7,
  action: "temper-item-action/fence-launder",
  active: true,
  updatedAt: "2026-09-26T17:39:51.697Z",
  categoryId: "temper-item-category-tree/containers",
} as const satisfies TemperInventoryRule
