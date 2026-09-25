import type { TemperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.types.ts"

export const balFoyen = {
  id: "01a06165-cbbc-7000-9fe5-717fb72d2c93",
  type: "page-type/temper-world-zone",
  slug: "bal-foyen",
  title: "Bal Foyen",
  esoZoneId: 281,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
  itemBrowserPlaceKind: 1,
} as const satisfies TemperWorldZone
