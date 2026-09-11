import type { TemperWorldZone } from "akasha/temper/catalog/temper-world/zones/temper-world-zone.page-type.types.ts"

export const westWeald = {
  id: "01a06165-cbc0-700a-b8bc-5be4244b5f3f",
  type: "temper-world-zone",
  slug: "west-weald",
  title: "West Weald",
  esoZoneId: 1443,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
} as const satisfies TemperWorldZone
