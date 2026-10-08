import type { TemperInventoryCurrency } from "akasha/temper/player/holdings/temper-inventory-currency/temper-inventory-currency.page-type.types.ts"

export const gold = {
  id: "01a05fcf-26bb-757b-9699-47c68673d7b1",
  type: "page-type/temper-inventory-currency",
  slug: "gold",
  title: "Gold",
  key: "gold",
  displayOrder: 0,
  esoCurrencyConstant: "CURT_MONEY",
  bankable: true,
  createdAt: "2026-09-02T01:50:06.523Z",
  updatedAt: "2026-09-27T03:14:22.000Z",
} as const satisfies TemperInventoryCurrency
