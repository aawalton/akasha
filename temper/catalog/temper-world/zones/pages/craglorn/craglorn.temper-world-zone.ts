import type { TemperWorldZone } from "akasha/temper/catalog/temper-world/zones/temper-world-zone.page-type.types.ts"

export const craglorn = {
  id: "01a06165-cbbc-700a-8370-35ccfba742ef",
  type: "temper-world-zone",
  slug: "craglorn",
  title: "Craglorn",
  esoZoneId: 888,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
} as const satisfies TemperWorldZone
