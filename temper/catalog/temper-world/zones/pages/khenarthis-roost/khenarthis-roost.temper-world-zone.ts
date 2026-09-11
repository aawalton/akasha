import type { TemperWorldZone } from "akasha/temper/catalog/temper-world/zones/temper-world-zone.page-type.types.ts"

export const khenarthisRoost = {
  id: "01a06165-cbbe-7005-b998-14007ef46aaa",
  pageTypeSlug: "temper-world-zone",
  type: "temper-world-zone",
  slug: "khenarthis-roost",
  title: "Khenarthi's Roost",
  esoZoneId: 537,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
} as const satisfies TemperWorldZone
