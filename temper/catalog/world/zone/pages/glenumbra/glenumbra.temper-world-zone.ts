import type { TemperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.types.ts"

export const glenumbra = {
  id: "01a06165-cbbd-7005-b50a-e5c1ff7db3aa",
  type: "page-type/temper-world-zone",
  slug: "glenumbra",
  title: "Glenumbra",
  esoZoneId: 3,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
  itemBrowserPlaceKind: 1,
} as const satisfies TemperWorldZone
