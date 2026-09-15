import type { TemperInventoryCurrency } from "akasha/temper/holdings/temper-inventory-currency/temper-inventory-currency.page-type.types.ts"

export const gold = {
  id: "01a05fcf-26bb-757b-9699-47c68673d7b1",
  type: "page-type/temper-inventory-currency",
  slug: "gold",
  title: "Gold",
  key: "gold",
  displayOrder: 0,
} as const satisfies TemperInventoryCurrency
