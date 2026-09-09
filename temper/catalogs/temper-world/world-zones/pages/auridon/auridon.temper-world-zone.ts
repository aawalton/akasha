import type { TemperWorldZone } from "../../temper-world-zone.page-type.ts"

export const auridon = {
  id: "01a06165-cbbb-7002-aaf9-a2ac80894b3d",
  pageTypeSlug: "temper-world-zone",
  slug: "auridon",
  title: "Auridon",
  esoZoneId: 381,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
} as const satisfies TemperWorldZone
