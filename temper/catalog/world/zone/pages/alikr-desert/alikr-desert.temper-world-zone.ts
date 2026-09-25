import type { TemperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.types.ts"

export const alikrDesert = {
  id: "01a06165-cbbb-7000-982d-789bbc2a1980",
  type: "page-type/temper-world-zone",
  slug: "alikr-desert",
  title: "Alik'r Desert",
  esoZoneId: 104,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
  itemBrowserPlaceKind: 1,
} as const satisfies TemperWorldZone
