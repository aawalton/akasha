import type { TemperWorldZone } from "../../temper-world-zone.page-type.ts"

export const wrothgar = {
  id: "01a06165-cbc0-700c-a29c-f6827b8f8e53",
  pageTypeSlug: "temper-world-zone",
  slug: "wrothgar",
  title: "Wrothgar",
  esoZoneId: 684,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
} as const satisfies TemperWorldZone
