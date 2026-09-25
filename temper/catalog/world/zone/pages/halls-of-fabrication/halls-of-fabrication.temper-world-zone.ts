import type { TemperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.types.ts"

export const hallsOfFabrication = {
  id: "01a06165-cbbe-7000-8911-a7e1e2b06b60",
  type: "page-type/temper-world-zone",
  slug: "halls-of-fabrication",
  title: "Halls of Fabrication",
  zoneQuests: "jsonl",
  itemBrowserPlaceKind: 4,
  esoZoneId: 975,
} as const satisfies TemperWorldZone
