import type { TemperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.types.ts"

export const khenarthisRoost = {
  id: "01a06165-cbbe-7005-b998-14007ef46aaa",
  type: "page-type/temper-world-zone",
  slug: "khenarthis-roost",
  title: "Khenarthi's Roost",
  esoZoneId: 537,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
  itemBrowserPlaceKind: 1,
} as const satisfies TemperWorldZone
