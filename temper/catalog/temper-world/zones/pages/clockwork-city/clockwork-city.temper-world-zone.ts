import type { TemperWorldZone } from "akasha/temper/catalog/temper-world/zones/temper-world-zone.page-type.types.ts"

export const clockworkCity = {
  id: "01a06165-cbbc-7007-b272-b48e50cf2ceb",
  type: "temper-world-zone",
  slug: "clockwork-city",
  title: "Clockwork City",
  esoZoneId: 980,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
} as const satisfies TemperWorldZone
