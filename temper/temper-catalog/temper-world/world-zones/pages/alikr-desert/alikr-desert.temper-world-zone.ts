import type { TemperWorldZone } from "../../temper-world-zone.page-type.ts"

export const alikrDesert = {
  id: "01a06165-cbbb-7000-982d-789bbc2a1980",
  pageTypeSlug: "temper-world-zone",
  slug: "alikr-desert",
  title: "Alik'r Desert",
  esoZoneId: 104,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
} as const satisfies TemperWorldZone
