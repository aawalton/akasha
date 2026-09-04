import type { TemperWorldZone } from "../../temper-world-zone.page-type.ts"

export const grahtwood = {
  id: "01a06165-cbbd-7007-a9f7-342d11bfcfee",
  pageTypeSlug: "temper-world-zone",
  slug: "grahtwood",
  title: "Grahtwood",
  esoZoneId: 383,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
} as const satisfies TemperWorldZone
