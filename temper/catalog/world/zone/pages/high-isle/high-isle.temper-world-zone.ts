import type { TemperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.types.ts"

export const highIsle = {
  id: "01a06165-cbbe-7002-9039-fc7227fdc98e",
  type: "page-type/temper-world-zone",
  slug: "high-isle",
  title: "High Isle",
  esoZoneId: 1318,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
  itemBrowserPlaceKind: 1,
} as const satisfies TemperWorldZone
