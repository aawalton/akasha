import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const deconstructStolen = {
  id: "01a0c613-98f4-734c-8386-a7f8d19c584a",
  type: "page-type/temper-rule-template",
  slug: "deconstruct-stolen",
  title: "Launder stolen equipment",
  key: "deconstruct-stolen",
  description:
    "Launders stolen equipment that no higher-priority rule claimed, so it can be deconstructed. Place directly before the leftover equipment deconstruct rule.",
  categoryId: "temper-item-category-tree/equipment",
  displayOrder: 26,
  action: "temper-item-action/fence-launder",
  active: false,
  goal: "temper-rule-goal/hoard",
  conditions: "jsonl",
  createdAt: "2026-09-21T22:26:08.244Z",
  updatedAt: "2026-09-22T22:08:51.000Z",
} as const satisfies TemperRuleTemplate
