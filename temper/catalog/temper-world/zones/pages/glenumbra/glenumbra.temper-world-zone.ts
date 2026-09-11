import type { TemperWorldZone } from "akasha/temper/catalog/temper-world/zones/temper-world-zone.page-type.types.ts"

export const glenumbra = {
  id: "01a06165-cbbd-7005-b50a-e5c1ff7db3aa",
  pageTypeSlug: "temper-world-zone",
  type: "temper-world-zone",
  slug: "glenumbra",
  title: "Glenumbra",
  esoZoneId: 3,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
} as const satisfies TemperWorldZone
