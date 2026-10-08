import type { TemperInventoryCurrency } from "akasha/temper/player/holdings/temper-inventory-currency/temper-inventory-currency.page-type.types.ts"

export const crowns = {
  id: "01a05fcf-26bb-72c5-829a-43d1fe7e55c8",
  type: "page-type/temper-inventory-currency",
  slug: "crowns",
  title: "Crowns",
  key: "crowns",
  displayOrder: 8,
  esoCurrencyConstant: "CURT_CROWNS",
  createdAt: "2026-09-02T01:50:06.523Z",
  updatedAt: "2026-09-27T03:14:22.000Z",
} as const satisfies TemperInventoryCurrency
