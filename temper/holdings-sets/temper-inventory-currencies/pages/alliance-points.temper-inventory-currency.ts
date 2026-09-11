import type { TemperInventoryCurrency } from "akasha/temper/holdings-sets/temper-inventory-currencies/temper-inventory-currency.page-type.types.ts"

export const alliancePoints = {
  id: "01a05fcf-26ba-7c03-a55d-6576f2d2d07a",
  pageTypeSlug: "temper-inventory-currency",
  type: "temper-inventory-currency",
  slug: "alliance-points",
  title: "Alliance Points",
  key: "alliancePoints",
  displayOrder: 1,
} as const satisfies TemperInventoryCurrency
