import type { TemperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.types.ts"

export const greenshade = {
  id: "01a06165-cbbd-7008-baea-0df5d538d11a",
  type: "page-type/temper-world-zone",
  slug: "greenshade",
  title: "Greenshade",
  esoZoneId: 108,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
  itemBrowserPlaceKind: 1,
} as const satisfies TemperWorldZone
