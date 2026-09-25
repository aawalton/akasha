import type { TemperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.types.ts"

export const shadowfen = {
  id: "01a06165-cbbf-7004-847c-e4acf1aa1714",
  type: "page-type/temper-world-zone",
  slug: "shadowfen",
  title: "Shadowfen",
  esoZoneId: 117,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
  itemBrowserPlaceKind: 1,
} as const satisfies TemperWorldZone
