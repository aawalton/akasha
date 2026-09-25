import type { TemperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.types.ts"

export const westernSkyrim = {
  id: "01a06165-cbc0-700b-8528-7ed0da781407",
  type: "page-type/temper-world-zone",
  slug: "western-skyrim",
  title: "Western Skyrim",
  esoZoneId: 1160,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
  itemBrowserPlaceKind: 1,
} as const satisfies TemperWorldZone
