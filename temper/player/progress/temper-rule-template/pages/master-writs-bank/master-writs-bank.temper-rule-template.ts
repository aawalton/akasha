import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const masterWritsBank = {
  id: "019e3104-2617-7629-b790-576e7d97a15b",
  type: "page-type/temper-rule-template",
  slug: "master-writs-bank",
  title: "Bank master writs",
  key: "master-writs-bank",
  description:
    "Stashes master writs in the bank. Master writs reward writ vouchers for high-end crafting station furnishings.",
  categoryId: "temper-item-category-tree/master-writs",
  displayOrder: 20,
  action: "temper-item-action/move-to",
  active: false,
  goal: "temper-rule-goal/task",
  destination: "bank",
} as const satisfies TemperRuleTemplate
