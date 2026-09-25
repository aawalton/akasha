import type { TemperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.types.ts"

export const stormhaven = {
  id: "01a06165-cbbf-7009-8d94-bf3df8416ce4",
  type: "page-type/temper-world-zone",
  slug: "stormhaven",
  title: "Stormhaven",
  esoZoneId: 19,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
  itemBrowserPlaceKind: 1,
} as const satisfies TemperWorldZone
