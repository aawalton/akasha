import type { TemperInventoryCurrency } from "akasha/temper/player/holdings/temper-inventory-currency/temper-inventory-currency.page-type.types.ts"

export const tomeTokens = {
  id: "01a05fcf-26bc-71ee-bbca-22dad35e2f74",
  type: "page-type/temper-inventory-currency",
  slug: "tome-tokens",
  title: "Tome Tokens",
  key: "tomeTokens",
  displayOrder: 14,
  esoCurrencyConstant: "CURT_TOME_TOKENS",
  createdAt: "2026-09-02T01:50:06.524Z",
  updatedAt: "2026-09-27T03:14:22.000Z",
} as const satisfies TemperInventoryCurrency
