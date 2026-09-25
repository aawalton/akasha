import type { TemperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.types.ts"

export const northernElsweyr = {
  id: "01a06165-cbbe-700c-a971-c9cbf7ae9d1a",
  type: "page-type/temper-world-zone",
  slug: "northern-elsweyr",
  title: "Northern Elsweyr",
  esoZoneId: 1086,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
  itemBrowserPlaceKind: 1,
} as const satisfies TemperWorldZone
