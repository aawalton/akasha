import type { TemperWorldZone } from "akasha/temper/catalog/temper-world/zones/temper-world-zone.page-type.types.ts"

export const theScholarium = {
  id: "01a06165-cbc0-7005-bd68-4bf08054a036",
  pageTypeSlug: "temper-world-zone",
  type: "temper-world-zone",
  slug: "the-scholarium",
  title: "The Scholarium",
  zoneQuests: "jsonl",
} as const satisfies TemperWorldZone
