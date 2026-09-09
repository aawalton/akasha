import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const ruleOtherCurrencyBank = {
  id: "01a0728b-6d6d-7c4b-ad71-6b92012f5852",
  pageTypeSlug: "temper-inventory-rule",
  type: "temper-inventory-rule",
  slug: "rule-other-currency-bank",
  title: "Bank other currencies",
  description:
    "Deposits alliance points, tel var stones, and writ vouchers into the bank when visiting.",
  goal: "hoard",
  destination: "bank",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "currency",
  displayOrder: 6,
  action: "move-to",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "other-currency-bank",
} as const satisfies TemperInventoryRule
