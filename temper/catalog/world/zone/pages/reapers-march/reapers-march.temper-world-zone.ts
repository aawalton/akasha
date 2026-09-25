import type { TemperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.types.ts"

export const reapersMarch = {
  id: "01a06165-cbbe-700d-ae97-52a0db124606",
  type: "page-type/temper-world-zone",
  slug: "reapers-march",
  title: "Reaper's March",
  esoZoneId: 382,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
  itemBrowserPlaceKind: 1,
} as const satisfies TemperWorldZone
