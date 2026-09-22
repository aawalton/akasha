import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const inspireStolen = {
  id: "019e3104-2614-7316-8d1c-1e373007d0dc",
  type: "page-type/temper-rule-template",
  slug: "inspire-stolen",
  title: "Launder stolen inspiration",
  key: "inspire-stolen",
  description:
    "Launders stolen equipment that would give useful crafting inspiration, so it can be deconstructed. Place before other inspiration rules.",
  categoryId: "temper-item-category-tree/equipment",
  displayOrder: 16,
  action: "temper-item-action/fence-launder",
  active: false,
  goal: "temper-rule-goal/progress",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
