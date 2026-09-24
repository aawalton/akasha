import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const rule26fb56ce = {
  id: "01a0728a-d6fe-7f39-a8dd-344d5c83df85",
  type: "page-type/temper-inventory-rule",
  slug: "rule-26fb56ce",
  title: "Launder stolen lockpicks",
  description: "Launders stolen lockpicks so they can be banked or used instead of fence-sold.",
  goal: "temper-rule-goal/hoard",
  conditions: "jsonl",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/lockpicks",
  displayOrder: 37,
  action: "temper-item-action/fence-launder",
  active: true,
  updatedAt: "2026-05-31T18:39:21.682Z",
} as const satisfies TemperInventoryRule
