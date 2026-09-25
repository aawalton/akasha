import type { TemperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.types.ts"

export const theReach = {
  id: "01a06165-cbc0-7003-a383-0977307031e7",
  type: "page-type/temper-world-zone",
  slug: "the-reach",
  title: "The Reach",
  esoZoneId: 1207,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
  itemBrowserPlaceKind: 1,
} as const satisfies TemperWorldZone
