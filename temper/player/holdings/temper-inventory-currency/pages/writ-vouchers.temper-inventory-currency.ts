import type { TemperInventoryCurrency } from "akasha/temper/player/holdings/temper-inventory-currency/temper-inventory-currency.page-type.types.ts"

export const writVouchers = {
  id: "01a05fcf-26bd-7630-ae52-bc3805dfada7",
  type: "page-type/temper-inventory-currency",
  slug: "writ-vouchers",
  title: "Writ Vouchers",
  key: "writVouchers",
  displayOrder: 4,
  esoCurrencyConstant: "CURT_WRIT_VOUCHERS",
  bankable: true,
  createdAt: "2026-09-02T01:50:06.525Z",
  updatedAt: "2026-09-27T03:14:22.000Z",
} as const satisfies TemperInventoryCurrency
