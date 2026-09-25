import type { TemperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.types.ts"

export const grahtwood = {
  id: "01a06165-cbbd-7007-a9f7-342d11bfcfee",
  type: "page-type/temper-world-zone",
  slug: "grahtwood",
  title: "Grahtwood",
  esoZoneId: 383,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
  itemBrowserPlaceKind: 1,
} as const satisfies TemperWorldZone
