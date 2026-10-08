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
  displayOrder: 47,
  action: "temper-item-action/fence-launder",
  active: true,
  ruleChangedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  createdAt: "2026-09-05T17:08:55.279Z",
  updatedAt: "2026-10-08T14:43:46.000Z",
} as const satisfies TemperInventoryRule
