import type { TemperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.types.ts"

export const blackwood = {
  id: "01a06165-cbbc-7004-a17c-e3842c8ead50",
  type: "page-type/temper-world-zone",
  slug: "blackwood",
  title: "Blackwood",
  esoZoneId: 1261,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
  itemBrowserPlaceKind: 1,
} as const satisfies TemperWorldZone
