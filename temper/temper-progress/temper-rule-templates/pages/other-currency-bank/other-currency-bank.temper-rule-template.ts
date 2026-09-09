import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const otherCurrencyBank = {
  id: "019e3104-2606-728c-af2a-44cdb3ecd36c",
  pageTypeSlug: "temper-rule-template",
  slug: "other-currency-bank",
  title: "Bank other currencies",
  key: "other-currency-bank",
  description:
    "Deposits alliance points, tel var stones, and writ vouchers into the bank when visiting.",
  categoryId: "currency",
  displayOrder: 1,
  action: "move-to",
  active: false,
  goal: "hoard",
  destination: "bank",
} as const satisfies TemperRuleTemplate
