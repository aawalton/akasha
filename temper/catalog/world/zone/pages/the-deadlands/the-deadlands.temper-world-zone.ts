import type { TemperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.types.ts"

export const theDeadlands = {
  id: "01a06165-cbbf-700d-8f29-87043eed92f8",
  type: "page-type/temper-world-zone",
  slug: "the-deadlands",
  title: "The Deadlands",
  esoZoneId: 1286,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
  itemBrowserPlaceKind: 1,
  createdAt: "2026-09-02T09:14:16.383Z",
  updatedAt: "2026-09-25T18:37:34.000Z",
} as const satisfies TemperWorldZone
