import type { TemperZone } from "akasha/temper/catalog/temper-world/temper-zones/temper-zone.page-type.types.ts"

export const stormhaven = {
  id: "019e17d9-3c91-759a-8795-b4cbd9d14248",
  type: "temper-zone",
  slug: "stormhaven",
  title: "Stormhaven",
  dropsScripts: true,
  isDlc: false,
} as const satisfies TemperZone
