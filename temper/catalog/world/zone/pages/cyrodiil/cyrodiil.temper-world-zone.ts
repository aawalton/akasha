import type { TemperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.types.ts"

export const cyrodiil = {
  id: "01a06165-cbbd-7000-b33f-e34441cdb182",
  type: "page-type/temper-world-zone",
  slug: "cyrodiil",
  title: "Cyrodiil",
  esoZoneId: 181,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
  itemBrowserPlaceKind: 2,
  createdAt: "2026-09-02T09:14:16.381Z",
  updatedAt: "2026-09-25T18:37:34.000Z",
} as const satisfies TemperWorldZone
