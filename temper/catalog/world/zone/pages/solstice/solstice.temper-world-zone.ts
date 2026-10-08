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
  createdAt: "2026-09-02T09:14:16.383Z",
  updatedAt: "2026-09-25T18:37:34.000Z",
} as const satisfies TemperWorldZone
