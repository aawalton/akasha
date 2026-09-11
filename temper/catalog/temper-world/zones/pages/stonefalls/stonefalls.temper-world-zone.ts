import type { TemperWorldZone } from "akasha/temper/catalog/temper-world/zones/temper-world-zone.page-type.types.ts"

export const stonefalls = {
  id: "01a06165-cbbf-7008-a0df-a246f5ecc354",
  type: "temper-world-zone",
  slug: "stonefalls",
  title: "Stonefalls",
  esoZoneId: 41,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
} as const satisfies TemperWorldZone
