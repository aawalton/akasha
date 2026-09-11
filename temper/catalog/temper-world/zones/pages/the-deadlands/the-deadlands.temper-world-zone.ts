import type { TemperWorldZone } from "akasha/temper/catalog/temper-world/zones/temper-world-zone.page-type.types.ts"

export const theDeadlands = {
  id: "01a06165-cbbf-700d-8f29-87043eed92f8",
  type: "temper-world-zone",
  slug: "the-deadlands",
  title: "The Deadlands",
  esoZoneId: 1286,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
} as const satisfies TemperWorldZone
