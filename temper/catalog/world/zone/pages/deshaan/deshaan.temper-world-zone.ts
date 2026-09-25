import type { TemperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.types.ts"

export const deshaan = {
  id: "01a06165-cbbd-7001-a04d-6fe41f75dac4",
  type: "page-type/temper-world-zone",
  slug: "deshaan",
  title: "Deshaan",
  esoZoneId: 57,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
  itemBrowserPlaceKind: 1,
} as const satisfies TemperWorldZone
