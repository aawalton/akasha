import type { TemperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.types.ts"

export const mawOfLorkhaj = {
  id: "01a06165-cbbe-7009-ac6a-1945e66a28fb",
  type: "page-type/temper-world-zone",
  slug: "maw-of-lorkhaj",
  title: "Maw of Lorkhaj",
  zoneQuests: "jsonl",
  itemBrowserPlaceKind: 4,
  esoZoneId: 725,
} as const satisfies TemperWorldZone
