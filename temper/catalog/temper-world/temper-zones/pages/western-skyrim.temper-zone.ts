import type { TemperZone } from "akasha/temper/catalog/temper-world/temper-zones/temper-zone.page-type.types.ts"

export const westernSkyrim = {
  id: "019e17d9-496f-7f5e-bc44-3a45a709fb0b",
  type: "temper-zone",
  slug: "western-skyrim",
  title: "Western Skyrim",
  dropsScripts: true,
  isDlc: true,
} as const satisfies TemperZone
