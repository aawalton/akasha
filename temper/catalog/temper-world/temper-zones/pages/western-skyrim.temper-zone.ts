import type { TemperZone } from "../temper-zone.page-type.types.ts"

export const westernSkyrim = {
  id: "019e17d9-496f-7f5e-bc44-3a45a709fb0b",
  pageTypeSlug: "temper-zone",
  type: "temper-zone",
  slug: "western-skyrim",
  title: "Western Skyrim",
  dropsScripts: true,
  isDlc: true,
} as const satisfies TemperZone
