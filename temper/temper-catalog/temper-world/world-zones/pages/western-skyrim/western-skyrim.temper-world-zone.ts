import type { TemperWorldZone } from "../../temper-world-zone.page-type.ts"

export const westernSkyrim = {
  id: "01a06165-cbc0-700b-8528-7ed0da781407",
  pageTypeSlug: "temper-world-zone",
  slug: "western-skyrim",
  title: "Western Skyrim",
  esoZoneId: 1160,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
} as const satisfies TemperWorldZone
