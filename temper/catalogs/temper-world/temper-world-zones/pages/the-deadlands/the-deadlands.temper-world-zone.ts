import type { TemperWorldZone } from "../../temper-world-zone.page-type.ts"

export const theDeadlands = {
  id: "01a06165-cbbf-700d-8f29-87043eed92f8",
  pageTypeSlug: "temper-world-zone",
  slug: "the-deadlands",
  title: "The Deadlands",
  esoZoneId: 1286,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
} as const satisfies TemperWorldZone
