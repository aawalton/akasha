import type { TemperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.types.ts"

export const infiniteArchive = {
  id: "01a06165-cbbe-7004-87dc-e357e67c9604",
  type: "page-type/temper-world-zone",
  slug: "infinite-archive",
  title: "Infinite Archive",
  zoneQuests: "jsonl",
  itemBrowserPlaceKind: 5,
  esoZoneId: 1436,
} as const satisfies TemperWorldZone
