import type { TemperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.types.ts"

export const eastmarch = {
  id: "01a06165-cbbd-7003-bc9b-15d12e6efdcd",
  type: "page-type/temper-world-zone",
  slug: "eastmarch",
  title: "Eastmarch",
  esoZoneId: 101,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
  itemBrowserPlaceKind: 1,
} as const satisfies TemperWorldZone
