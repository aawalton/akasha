import type { TemperZone } from "akasha/temper/catalog/world/temper-zone/temper-zone.page-type.types.ts"

export const westWeald = {
  id: "019e17d9-4281-773b-8dda-2c0086bd20dc",
  type: "page-type/temper-zone",
  slug: "west-weald",
  title: "West Weald",
  dropsScripts: true,
  isDlc: true,
} as const satisfies TemperZone
