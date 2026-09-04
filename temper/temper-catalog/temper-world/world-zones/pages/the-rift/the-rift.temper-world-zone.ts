import type { TemperWorldZone } from "../../temper-world-zone.page-type.ts"

export const theRift = {
  id: "01a06165-cbc0-7004-b257-a8ba4ad8f236",
  pageTypeSlug: "temper-world-zone",
  slug: "the-rift",
  title: "The Rift",
  esoZoneId: 103,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
} as const satisfies TemperWorldZone
