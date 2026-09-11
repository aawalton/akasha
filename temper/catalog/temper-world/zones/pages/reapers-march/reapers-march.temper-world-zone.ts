import type { TemperWorldZone } from "akasha/temper/catalog/temper-world/zones/temper-world-zone.page-type.types.ts"

export const reapersMarch = {
  id: "01a06165-cbbe-700d-ae97-52a0db124606",
  type: "temper-world-zone",
  slug: "reapers-march",
  title: "Reaper's March",
  esoZoneId: 382,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
} as const satisfies TemperWorldZone
