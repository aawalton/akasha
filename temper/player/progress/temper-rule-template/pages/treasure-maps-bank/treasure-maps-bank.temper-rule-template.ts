import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const treasureMapsBank = {
  id: "019e3104-2618-7f6b-9442-fb9a11ef7939",
  type: "page-type/temper-rule-template",
  slug: "treasure-maps-bank",
  title: "Bank treasure maps",
  key: "treasure-maps-bank",
  description:
    "Stashes treasure maps in the bank for later use. Treasure maps lead to chests with set gear.",
  categoryId: "temper-item-category-tree/treasure-maps",
  displayOrder: 22,
  action: "temper-item-action/move-to",
  active: false,
  goal: "temper-rule-goal/task",
  destination: "bank",
} as const satisfies TemperRuleTemplate
