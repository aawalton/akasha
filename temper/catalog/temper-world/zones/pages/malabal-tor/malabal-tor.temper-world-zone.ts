import type { TemperWorldZone } from "akasha/temper/catalog/temper-world/zones/temper-world-zone.page-type.types.ts"

export const malabalTor = {
  id: "01a06165-cbbe-7008-9acc-c8dfceae494a",
  type: "temper-world-zone",
  slug: "malabal-tor",
  title: "Malabal Tor",
  esoZoneId: 58,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
} as const satisfies TemperWorldZone
