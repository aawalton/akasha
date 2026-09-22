import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const otherCurrencyBank = {
  id: "019e3104-2606-728c-af2a-44cdb3ecd36c",
  type: "page-type/temper-rule-template",
  slug: "other-currency-bank",
  title: "Bank other currencies",
  key: "other-currency-bank",
  description:
    "Deposits alliance points, tel var stones, and writ vouchers into the bank when visiting.",
  categoryId: "temper-item-category-tree/currency",
  displayOrder: 1,
  action: "temper-item-action/move-to",
  active: false,
  goal: "temper-rule-goal/hoard",
  destination: "bank",
} as const satisfies TemperRuleTemplate
