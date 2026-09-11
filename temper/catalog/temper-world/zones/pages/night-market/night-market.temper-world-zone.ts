import type { TemperWorldZone } from "akasha/temper/catalog/temper-world/zones/temper-world-zone.page-type.types.ts"

export const nightMarket = {
  id: "01a06165-cbbe-700b-9254-283da1ea6832",
  pageTypeSlug: "temper-world-zone",
  type: "temper-world-zone",
  slug: "night-market",
  title: "Night Market",
  zoneQuests: "jsonl",
} as const satisfies TemperWorldZone
