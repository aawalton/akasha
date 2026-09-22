import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const accountBankUpgrades = {
  id: "01a05fcb-e4bb-7863-b7ea-add19b041057",
  type: "page-type/temper-completion-category",
  slug: "account-bank-upgrades",
  title: "Bank Upgrades",
  nodeId: "bank-upgrades",
  tab: "account",
  displayOrder: 4,
  parent: "temper-completion-category/account",
} as const satisfies TemperCompletionCategory
