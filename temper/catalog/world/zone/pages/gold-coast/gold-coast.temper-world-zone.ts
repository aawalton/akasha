import type { TemperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.types.ts"

export const goldCoast = {
  id: "01a06165-cbbd-7006-85bf-02e5e947caeb",
  type: "page-type/temper-world-zone",
  slug: "gold-coast",
  title: "Gold Coast",
  esoZoneId: 823,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
  itemBrowserPlaceKind: 1,
} as const satisfies TemperWorldZone
