import type { TemperWorldZone } from "../../temper-world-zone.page-type.ts"

export const westWeald = {
  id: "01a06165-cbc0-700a-b8bc-5be4244b5f3f",
  pageTypeSlug: "temper-world-zone",
  slug: "west-weald",
  title: "West Weald",
  esoZoneId: 1443,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
} as const satisfies TemperWorldZone
