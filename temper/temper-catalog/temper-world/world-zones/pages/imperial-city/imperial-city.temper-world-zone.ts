import type { TemperWorldZone } from "../../temper-world-zone.page-type.ts"

export const imperialCity = {
  id: "01a06165-cbbe-7003-a6c1-8d7142c47b7d",
  pageTypeSlug: "temper-world-zone",
  slug: "imperial-city",
  title: "Imperial City",
  esoZoneId: 584,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
} as const satisfies TemperWorldZone
