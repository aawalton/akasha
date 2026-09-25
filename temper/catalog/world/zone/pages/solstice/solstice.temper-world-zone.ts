import type { TemperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.types.ts"

export const solstice = {
  id: "01a06165-cbbf-7005-88ee-a5980ebfe323",
  type: "page-type/temper-world-zone",
  slug: "solstice",
  title: "Solstice",
  esoZoneId: 1502,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
  itemBrowserPlaceKind: 1,
} as const satisfies TemperWorldZone
