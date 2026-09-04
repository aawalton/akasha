import type { TemperWorldZone } from "../../temper-world-zone.page-type.ts"

export const eastmarch = {
  id: "01a06165-cbbd-7003-bc9b-15d12e6efdcd",
  pageTypeSlug: "temper-world-zone",
  slug: "eastmarch",
  title: "Eastmarch",
  esoZoneId: 101,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
} as const satisfies TemperWorldZone
