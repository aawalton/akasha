import type { TemperInventoryCurrency } from "akasha/temper/holdings/temper-inventory-currency/temper-inventory-currency.page-type.types.ts"

export const crownGems = {
  id: "01a05fcf-26ba-74ed-95cb-48aa8e2fc635",
  type: "page-type/temper-inventory-currency",
  slug: "crown-gems",
  title: "Crown Gems",
  key: "crownGems",
  displayOrder: 9,
} as const satisfies TemperInventoryCurrency
