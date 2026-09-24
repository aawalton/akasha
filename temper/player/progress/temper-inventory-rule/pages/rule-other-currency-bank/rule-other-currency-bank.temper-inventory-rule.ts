import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleOtherCurrencyBank = {
  id: "01a0728b-6d6d-7c4b-ad71-6b92012f5852",
  type: "page-type/temper-inventory-rule",
  slug: "rule-other-currency-bank",
  title: "Bank other currencies",
  description:
    "Deposits alliance points, tel var stones, and writ vouchers into the bank when visiting.",
  goal: "temper-rule-goal/hoard",
  destination: "bank",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/currency",
  displayOrder: 6,
  action: "temper-item-action/move-to",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "temper-rule-template/other-currency-bank",
} as const satisfies TemperInventoryRule
