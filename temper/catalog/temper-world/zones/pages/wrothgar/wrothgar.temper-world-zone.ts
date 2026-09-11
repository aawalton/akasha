import type { TemperWorldZone } from "akasha/temper/catalog/temper-world/zones/temper-world-zone.page-type.types.ts"

export const wrothgar = {
  id: "01a06165-cbc0-700c-a29c-f6827b8f8e53",
  type: "temper-world-zone",
  slug: "wrothgar",
  title: "Wrothgar",
  esoZoneId: 684,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
} as const satisfies TemperWorldZone
