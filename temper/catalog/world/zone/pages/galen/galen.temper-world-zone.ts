import type { TemperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.types.ts"

export const galen = {
  id: "01a06165-cbbd-7004-bb82-16f8665461c5",
  type: "page-type/temper-world-zone",
  slug: "galen",
  title: "Galen",
  esoZoneId: 1383,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
  itemBrowserPlaceKind: 1,
} as const satisfies TemperWorldZone
