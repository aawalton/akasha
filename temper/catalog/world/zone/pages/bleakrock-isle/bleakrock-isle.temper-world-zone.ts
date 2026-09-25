import type { TemperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.types.ts"

export const bleakrockIsle = {
  id: "01a06165-cbbc-7005-89ae-75c570941290",
  type: "page-type/temper-world-zone",
  slug: "bleakrock-isle",
  title: "Bleakrock Isle",
  esoZoneId: 280,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
  itemBrowserPlaceKind: 1,
} as const satisfies TemperWorldZone
