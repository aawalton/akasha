import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const craftingStolen = {
  id: "019e3104-261d-7c75-8813-f427ac1358a8",
  type: "page-type/temper-rule-template",
  slug: "crafting-stolen",
  title: "Launder crafting materials",
  key: "crafting-stolen",
  description: "Launders stolen crafting materials so they can be deposited or used.",
  categoryId: "temper-item-category-tree/crafting",
  displayOrder: 29,
  action: "temper-item-action/fence-launder",
  active: false,
  goal: "temper-rule-goal/hoard",
  conditions: "jsonl",
  createdAt: "2026-05-16T13:40:16.029Z",
  updatedAt: "2026-09-22T22:08:51.000Z",
} as const satisfies TemperRuleTemplate
