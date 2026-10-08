import type { TemperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.types.ts"

export const craglorn = {
  id: "01a06165-cbbc-700a-8370-35ccfba742ef",
  type: "page-type/temper-world-zone",
  slug: "craglorn",
  title: "Craglorn",
  esoZoneId: 888,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
  itemBrowserPlaceKind: 1,
  createdAt: "2026-09-02T09:14:16.380Z",
  updatedAt: "2026-09-25T18:37:34.000Z",
} as const satisfies TemperWorldZone
