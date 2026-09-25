import type { TemperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.types.ts"

export const rivenspire = {
  id: "01a06165-cbbe-700e-82b9-fb00e539477a",
  type: "page-type/temper-world-zone",
  slug: "rivenspire",
  title: "Rivenspire",
  esoZoneId: 20,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
  itemBrowserPlaceKind: 1,
} as const satisfies TemperWorldZone
