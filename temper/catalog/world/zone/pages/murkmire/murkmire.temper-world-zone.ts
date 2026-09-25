import type { TemperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.types.ts"

export const murkmire = {
  id: "01a06165-cbbe-700a-8ee5-87c48e13b373",
  type: "page-type/temper-world-zone",
  slug: "murkmire",
  title: "Murkmire",
  esoZoneId: 726,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
  itemBrowserPlaceKind: 1,
} as const satisfies TemperWorldZone
