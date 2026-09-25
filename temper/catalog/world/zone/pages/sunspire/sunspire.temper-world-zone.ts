import type { TemperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.types.ts"

export const sunspire = {
  id: "01a06165-cbbf-700c-9d88-05969c56c92f",
  type: "page-type/temper-world-zone",
  slug: "sunspire",
  title: "Sunspire",
  zoneQuests: "jsonl",
  itemBrowserPlaceKind: 4,
  esoZoneId: 1121,
} as const satisfies TemperWorldZone
