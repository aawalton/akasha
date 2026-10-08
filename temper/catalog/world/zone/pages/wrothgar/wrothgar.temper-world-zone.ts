import type { TemperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.types.ts"

export const wrothgar = {
  id: "01a06165-cbc0-700c-a29c-f6827b8f8e53",
  type: "page-type/temper-world-zone",
  slug: "wrothgar",
  title: "Wrothgar",
  esoZoneId: 684,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
  itemBrowserPlaceKind: 1,
  createdAt: "2026-09-02T09:14:16.384Z",
  updatedAt: "2026-09-25T18:37:34.000Z",
} as const satisfies TemperWorldZone
