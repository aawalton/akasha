import type { TemperCompletionCategory } from "akasha/temper/progressions/temper-completion-categories/temper-completion-category.page-type.types.ts"

export const accountBankUpgrades = {
  id: "01a05fcb-e4bb-7863-b7ea-add19b041057",
  type: "temper-completion-category",
  slug: "account-bank-upgrades",
  title: "Bank Upgrades",
  nodeId: "bank-upgrades",
  tab: "account",
  displayOrder: 4,
  parent: "account",
} as const satisfies TemperCompletionCategory
