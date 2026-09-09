import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const researchStolen = {
  id: "019e3104-2611-7cc5-8947-fe78ebffbff1",
  pageTypeSlug: "temper-rule-template",
  slug: "research-stolen",
  title: "Launder stolen researchables",
  key: "research-stolen",
  description:
    "Launders stolen equipment with a researchable trait so it can be submitted at a crafting station. Place before other research rules.",
  categoryId: "equipment",
  displayOrder: 13,
  action: "fence-launder",
  active: false,
  goal: "unlock",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
