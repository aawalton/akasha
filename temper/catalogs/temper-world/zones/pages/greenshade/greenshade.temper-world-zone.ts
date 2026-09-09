import type { TemperWorldZone } from "../../temper-world-zone.page-type.ts"

export const greenshade = {
  id: "01a06165-cbbd-7008-baea-0df5d538d11a",
  pageTypeSlug: "temper-world-zone",
  slug: "greenshade",
  title: "Greenshade",
  esoZoneId: 108,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
} as const satisfies TemperWorldZone
