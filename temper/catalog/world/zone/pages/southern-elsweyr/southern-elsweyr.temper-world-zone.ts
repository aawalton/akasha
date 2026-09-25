import type { TemperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.types.ts"

export const southernElsweyr = {
  id: "01a06165-cbbf-7006-a3f7-2903492c56c1",
  type: "page-type/temper-world-zone",
  slug: "southern-elsweyr",
  title: "Southern Elsweyr",
  esoZoneId: 1133,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
  itemBrowserPlaceKind: 1,
} as const satisfies TemperWorldZone
