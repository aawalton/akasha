import type { TemperItemBrowserSource } from "akasha/temper/catalog/world/item-browser-source/temper-item-browser-source.page-type.types.ts"

export const antiquities = {
  id: "01a0d9dd-503e-7c87-944a-a0c7c483ad86",
  type: "page-type/temper-item-browser-source",
  slug: "antiquities",
  title: "Antiquities",
  itemBrowserSourceId: -5,
  itemBrowserPlaceKind: 6,
} as const satisfies TemperItemBrowserSource
