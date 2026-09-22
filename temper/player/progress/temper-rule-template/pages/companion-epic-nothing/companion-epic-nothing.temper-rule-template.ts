import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const companionEpicNothing = {
  id: "019e3104-2609-739b-88ff-73723337601b",
  type: "page-type/temper-rule-template",
  slug: "companion-epic-nothing",
  title: "Protect epic+ companion gear",
  key: "companion-epic-nothing",
  description:
    "Prevents epic (purple) quality or higher companion equipment from being affected by lower-priority rules. Place above sell and deconstruct rules to safeguard your best companion gear.",
  categoryId: "temper-item-category-tree/companion",
  displayOrder: 4,
  action: "temper-item-action/nothing",
  active: false,
  goal: "temper-rule-goal/equip",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
