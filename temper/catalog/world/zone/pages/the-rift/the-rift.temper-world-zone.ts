import type { TemperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.types.ts"

export const theRift = {
  id: "01a06165-cbc0-7004-b257-a8ba4ad8f236",
  type: "page-type/temper-world-zone",
  slug: "the-rift",
  title: "The Rift",
  esoZoneId: 103,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
  itemBrowserPlaceKind: 1,
  createdAt: "2026-09-02T09:14:16.384Z",
  updatedAt: "2026-09-25T18:37:34.000Z",
} as const satisfies TemperWorldZone
