import type { TemperRuleTemplate } from "akasha/temper/progressions/temper-rule-templates/temper-rule-template.page-type.types.ts"

export const craftingStolen = {
  id: "019e3104-261d-7c75-8813-f427ac1358a8",
  type: "temper-rule-template",
  slug: "crafting-stolen",
  title: "Launder crafting materials",
  key: "crafting-stolen",
  description: "Launders stolen crafting materials so they can be deposited or used.",
  categoryId: "crafting",
  displayOrder: 28,
  action: "fence-launder",
  active: false,
  goal: "hoard",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
