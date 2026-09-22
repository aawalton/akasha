import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const treasuresStolenFence = {
  id: "019e3104-2626-7e2a-8df5-d83385768ba5",
  type: "page-type/temper-rule-template",
  slug: "treasures-stolen-fence",
  title: "Fence stolen treasures",
  key: "treasures-stolen-fence",
  description:
    "Sells stolen treasures at a fence. Stolen treasures can't be sold to normal merchants.",
  categoryId: "temper-item-category-tree/treasures",
  displayOrder: 40,
  action: "temper-item-action/fence-sell",
  active: false,
  goal: "temper-rule-goal/sell",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
