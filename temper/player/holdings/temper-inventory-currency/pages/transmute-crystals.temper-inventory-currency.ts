import type { TemperInventoryCurrency } from "akasha/temper/player/holdings/temper-inventory-currency/temper-inventory-currency.page-type.types.ts"

export const transmuteCrystals = {
  id: "01a05fcf-26bd-7fcc-9882-bd7fc3513c14",
  type: "page-type/temper-inventory-currency",
  slug: "transmute-crystals",
  title: "Transmute Crystals",
  key: "transmuteCrystals",
  displayOrder: 3,
} as const satisfies TemperInventoryCurrency
