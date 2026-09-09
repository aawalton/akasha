import type { TemperWorldZone } from "../../temper-world-zone.page-type.ts"

export const goldCoast = {
  id: "01a06165-cbbd-7006-85bf-02e5e947caeb",
  pageTypeSlug: "temper-world-zone",
  slug: "gold-coast",
  title: "Gold Coast",
  esoZoneId: 823,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
} as const satisfies TemperWorldZone
