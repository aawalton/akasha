import type { TemperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.types.ts"

export const coldharbour = {
  id: "01a06165-cbbc-7009-8df2-25124ca40e78",
  type: "page-type/temper-world-zone",
  slug: "coldharbour",
  title: "Coldharbour",
  esoZoneId: 347,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
  itemBrowserPlaceKind: 1,
} as const satisfies TemperWorldZone
