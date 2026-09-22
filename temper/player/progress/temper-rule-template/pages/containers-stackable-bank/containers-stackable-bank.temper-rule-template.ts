import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const containersStackableBank = {
  id: "019e3104-2607-7321-96e1-fb18f062084e",
  type: "page-type/temper-rule-template",
  slug: "containers-stackable-bank",
  title: "Bank stackable containers",
  key: "containers-stackable-bank",
  description:
    "Deposits stackable containers (reward coffers, event boxes, etc.) in the bank. Open them later in bulk or save for events.",
  categoryId: "temper-item-category-tree/container-stackable",
  displayOrder: 2,
  action: "temper-item-action/move-to",
  active: false,
  goal: "temper-rule-goal/hoard",
  destination: "bank",
} as const satisfies TemperRuleTemplate
