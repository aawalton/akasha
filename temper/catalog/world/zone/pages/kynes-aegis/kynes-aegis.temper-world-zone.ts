import type { TemperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.types.ts"

export const kynesAegis = {
  id: "01a06165-cbbe-7006-b5e1-f482efa5f0a4",
  type: "page-type/temper-world-zone",
  slug: "kynes-aegis",
  title: "Kyne's Aegis",
  zoneQuests: "jsonl",
  itemBrowserPlaceKind: 4,
  esoZoneId: 1196,
} as const satisfies TemperWorldZone
