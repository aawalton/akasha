import type { TemperWorldZone } from "../../temper-world-zone.page-type.ts"

export const craglorn = {
  id: "01a06165-cbbc-700a-8370-35ccfba742ef",
  pageTypeSlug: "temper-world-zone",
  slug: "craglorn",
  title: "Craglorn",
  esoZoneId: 888,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
} as const satisfies TemperWorldZone
