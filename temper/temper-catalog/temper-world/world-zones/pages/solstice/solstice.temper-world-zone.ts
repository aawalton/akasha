import type { TemperWorldZone } from "../../temper-world-zone.page-type.ts"

export const solstice = {
  id: "01a06165-cbbf-7005-88ee-a5980ebfe323",
  pageTypeSlug: "temper-world-zone",
  slug: "solstice",
  title: "Solstice",
  esoZoneId: 1502,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
} as const satisfies TemperWorldZone
