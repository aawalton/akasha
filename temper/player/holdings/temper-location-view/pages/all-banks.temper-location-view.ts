import type { TemperLocationView } from "akasha/temper/player/holdings/temper-location-view/temper-location-view.page-type.types.ts"

export const allBanks = {
  id: "01a0e0d9-4c1e-7002-a6e7-ab8253884a51",
  type: "page-type/temper-location-view",
  slug: "all-banks",
  title: "All Banks",
  key: "allBanks",
  displayOrder: 1,
} as const satisfies TemperLocationView
