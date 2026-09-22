import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const treasuresEpicStolen = {
  id: "019e3104-261f-7668-98d5-65fc2dc8d58a",
  type: "page-type/temper-rule-template",
  slug: "treasures-epic-stolen",
  title: "Launder epic+ treasures",
  key: "treasures-epic-stolen",
  description:
    "Launders stolen treasures of epic quality or higher. These are worth keeping — sell them legitimately or bank for later.",
  categoryId: "temper-item-category-tree/treasures",
  displayOrder: 31,
  action: "temper-item-action/fence-launder",
  active: false,
  goal: "temper-rule-goal/hoard",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
