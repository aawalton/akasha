import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleResearchStolen = {
  id: "01a0728b-6d6f-78a3-a8ee-4d5c402d674a",
  type: "page-type/temper-inventory-rule",
  slug: "rule-research-stolen",
  title: "Launder stolen researchables",
  description:
    "Launders stolen equipment with a researchable trait so it can be submitted at a crafting station. Place before other research rules.",
  goal: "temper-rule-goal/unlock",
  conditions: "jsonl",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/equipment",
  displayOrder: 41,
  action: "temper-item-action/fence-launder",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
} as const satisfies TemperInventoryRule
