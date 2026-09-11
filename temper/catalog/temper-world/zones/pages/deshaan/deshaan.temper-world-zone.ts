import type { TemperWorldZone } from "akasha/temper/catalog/temper-world/zones/temper-world-zone.page-type.types.ts"

export const deshaan = {
  id: "01a06165-cbbd-7001-a04d-6fe41f75dac4",
  type: "temper-world-zone",
  slug: "deshaan",
  title: "Deshaan",
  esoZoneId: 57,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
} as const satisfies TemperWorldZone
