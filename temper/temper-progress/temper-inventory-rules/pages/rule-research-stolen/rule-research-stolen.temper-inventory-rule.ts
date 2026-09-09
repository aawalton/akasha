import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const ruleResearchStolen = {
  id: "01a0728b-6d6f-78a3-a8ee-4d5c402d674a",
  pageTypeSlug: "temper-inventory-rule",
  type: "temper-inventory-rule",
  slug: "rule-research-stolen",
  title: "Launder stolen researchables",
  description:
    "Launders stolen equipment with a researchable trait so it can be submitted at a crafting station. Place before other research rules.",
  goal: "unlock",
  conditions: "jsonl",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "equipment",
  displayOrder: 40,
  action: "fence-launder",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "research-stolen",
} as const satisfies TemperInventoryRule
