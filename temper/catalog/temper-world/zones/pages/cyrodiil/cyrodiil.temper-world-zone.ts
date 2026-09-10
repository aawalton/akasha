import type { TemperWorldZone } from "../../temper-world-zone.page-type.types.ts"

export const cyrodiil = {
  id: "01a06165-cbbd-7000-b33f-e34441cdb182",
  pageTypeSlug: "temper-world-zone",
  type: "temper-world-zone",
  slug: "cyrodiil",
  title: "Cyrodiil",
  esoZoneId: 181,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
} as const satisfies TemperWorldZone
