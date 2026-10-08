import type { TemperInventoryCurrency } from "akasha/temper/player/holdings/temper-inventory-currency/temper-inventory-currency.page-type.types.ts"

export const crownGems = {
  id: "01a05fcf-26ba-74ed-95cb-48aa8e2fc635",
  type: "page-type/temper-inventory-currency",
  slug: "crown-gems",
  title: "Crown Gems",
  key: "crownGems",
  displayOrder: 9,
  esoCurrencyConstant: "CURT_CROWN_GEMS",
  createdAt: "2026-09-02T01:50:06.522Z",
  updatedAt: "2026-09-27T03:14:22.000Z",
} as const satisfies TemperInventoryCurrency
