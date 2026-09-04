import type { TemperWorldZone } from "../../temper-world-zone.page-type.ts"

export const bleakrockIsle = {
  id: "01a06165-cbbc-7005-89ae-75c570941290",
  pageTypeSlug: "temper-world-zone",
  slug: "bleakrock-isle",
  title: "Bleakrock Isle",
  esoZoneId: 280,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
} as const satisfies TemperWorldZone
