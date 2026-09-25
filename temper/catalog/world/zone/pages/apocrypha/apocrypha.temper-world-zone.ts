import type { TemperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.types.ts"

export const apocrypha = {
  id: "01a06165-cbbb-7001-9f73-4e7be86af69d",
  type: "page-type/temper-world-zone",
  slug: "apocrypha",
  title: "Apocrypha",
  esoZoneId: 1413,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
  itemBrowserPlaceKind: 1,
} as const satisfies TemperWorldZone
