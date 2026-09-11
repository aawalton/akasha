import type { TemperWorldZone } from "akasha/temper/catalog/temper-world/zones/temper-world-zone.page-type.types.ts"

export const balFoyen = {
  id: "01a06165-cbbc-7000-9fe5-717fb72d2c93",
  type: "temper-world-zone",
  slug: "bal-foyen",
  title: "Bal Foyen",
  esoZoneId: 281,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
} as const satisfies TemperWorldZone
