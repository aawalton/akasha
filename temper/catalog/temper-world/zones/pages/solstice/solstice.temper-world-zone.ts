import type { TemperWorldZone } from "akasha/temper/catalog/temper-world/zones/temper-world-zone.page-type.types.ts"

export const solstice = {
  id: "01a06165-cbbf-7005-88ee-a5980ebfe323",
  type: "temper-world-zone",
  slug: "solstice",
  title: "Solstice",
  esoZoneId: 1502,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
} as const satisfies TemperWorldZone
