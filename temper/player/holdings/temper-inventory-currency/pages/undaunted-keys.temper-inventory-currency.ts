import type { TemperInventoryCurrency } from "akasha/temper/player/holdings/temper-inventory-currency/temper-inventory-currency.page-type.types.ts"

export const undauntedKeys = {
  id: "01a05fcf-26bd-7d73-b337-6a9ddbff750f",
  type: "page-type/temper-inventory-currency",
  slug: "undaunted-keys",
  title: "Undaunted Keys",
  key: "undauntedKeys",
  displayOrder: 7,
  esoCurrencyConstant: "CURT_UNDAUNTED_KEYS",
} as const satisfies TemperInventoryCurrency
