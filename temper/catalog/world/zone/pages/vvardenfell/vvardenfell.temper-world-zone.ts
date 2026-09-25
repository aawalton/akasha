import type { TemperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.types.ts"

export const vvardenfell = {
  id: "01a06165-cbc0-7009-a345-c95f3c0a4e3c",
  type: "page-type/temper-world-zone",
  slug: "vvardenfell",
  title: "Vvardenfell",
  esoZoneId: 849,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
  itemBrowserPlaceKind: 1,
} as const satisfies TemperWorldZone
