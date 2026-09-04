import type { TemperWorldZone } from "../../temper-world-zone.page-type.ts"

export const vvardenfell = {
  id: "01a06165-cbc0-7009-a345-c95f3c0a4e3c",
  pageTypeSlug: "temper-world-zone",
  slug: "vvardenfell",
  title: "Vvardenfell",
  esoZoneId: 849,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
} as const satisfies TemperWorldZone
