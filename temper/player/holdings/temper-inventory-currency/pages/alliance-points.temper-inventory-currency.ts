import type { TemperInventoryCurrency } from "akasha/temper/player/holdings/temper-inventory-currency/temper-inventory-currency.page-type.types.ts"

export const alliancePoints = {
  id: "01a05fcf-26ba-7c03-a55d-6576f2d2d07a",
  type: "page-type/temper-inventory-currency",
  slug: "alliance-points",
  title: "Alliance Points",
  key: "alliancePoints",
  displayOrder: 1,
  esoCurrencyConstant: "CURT_ALLIANCE_POINTS",
  bankable: true,
  createdAt: "2026-09-02T01:50:06.522Z",
  updatedAt: "2026-09-27T03:14:22.000Z",
} as const satisfies TemperInventoryCurrency
