import type { TemperItemBrowserSource } from "akasha/temper/catalog/world/item-browser-source/temper-item-browser-source.page-type.types.ts"

export const battlegrounds = {
  id: "01a0d9dd-503f-78e2-8af6-8169a0301e06",
  type: "page-type/temper-item-browser-source",
  slug: "battlegrounds",
  title: "Battlegrounds",
  itemBrowserSourceId: -2,
  itemBrowserPlaceKind: 2,
} as const satisfies TemperItemBrowserSource
