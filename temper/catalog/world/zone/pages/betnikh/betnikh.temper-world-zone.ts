import type { TemperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.types.ts"

export const betnikh = {
  id: "01a06165-cbbc-7002-96d9-b150587b97a9",
  type: "page-type/temper-world-zone",
  slug: "betnikh",
  title: "Betnikh",
  esoZoneId: 535,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
  itemBrowserPlaceKind: 1,
} as const satisfies TemperWorldZone
