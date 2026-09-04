import type { TemperWorldZone } from "../../temper-world-zone.page-type.ts"

export const stormhaven = {
  id: "01a06165-cbbf-7009-8d94-bf3df8416ce4",
  pageTypeSlug: "temper-world-zone",
  slug: "stormhaven",
  title: "Stormhaven",
  esoZoneId: 19,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
} as const satisfies TemperWorldZone
