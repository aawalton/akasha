import type { TemperZone } from "akasha/temper/catalog/world/temper-zone/temper-zone.page-type.types.ts"

export const theDeadlands = {
  id: "019e17d9-4708-7fd3-9f4c-bc6058abf2dd",
  type: "page-type/temper-zone",
  slug: "the-deadlands",
  title: "The Deadlands",
  dropsScripts: true,
  isDlc: true,
} as const satisfies TemperZone
