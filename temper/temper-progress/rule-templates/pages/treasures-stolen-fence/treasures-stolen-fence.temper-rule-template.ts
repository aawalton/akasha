import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const treasuresStolenFence = {
  id: "019e3104-2626-7e2a-8df5-d83385768ba5",
  pageTypeSlug: "temper-rule-template",
  slug: "treasures-stolen-fence",
  title: "Fence stolen treasures",
  key: "treasures-stolen-fence",
  description:
    "Sells stolen treasures at a fence. Stolen treasures can't be sold to normal merchants.",
  categoryId: "treasures",
  displayOrder: 39,
  action: "fence-sell",
  active: false,
  goal: "sell",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
