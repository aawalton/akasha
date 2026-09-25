import type { TemperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.types.ts"

export const hewsBane = {
  id: "01a06165-cbbe-7001-91d4-9a6f726c3fbb",
  type: "page-type/temper-world-zone",
  slug: "hews-bane",
  title: "Hew's Bane",
  esoZoneId: 816,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
  itemBrowserPlaceKind: 1,
} as const satisfies TemperWorldZone
