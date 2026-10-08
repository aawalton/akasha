import type { TemperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.types.ts"

export const westWeald = {
  id: "01a06165-cbc0-700a-b8bc-5be4244b5f3f",
  type: "page-type/temper-world-zone",
  slug: "west-weald",
  title: "West Weald",
  esoZoneId: 1443,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
  itemBrowserPlaceKind: 1,
  createdAt: "2026-09-02T09:14:16.384Z",
  updatedAt: "2026-09-25T18:37:34.000Z",
} as const satisfies TemperWorldZone
