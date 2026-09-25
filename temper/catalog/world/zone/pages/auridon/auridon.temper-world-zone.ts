import type { TemperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.types.ts"

export const auridon = {
  id: "01a06165-cbbb-7002-aaf9-a2ac80894b3d",
  type: "page-type/temper-world-zone",
  slug: "auridon",
  title: "Auridon",
  esoZoneId: 381,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
  itemBrowserPlaceKind: 1,
} as const satisfies TemperWorldZone
