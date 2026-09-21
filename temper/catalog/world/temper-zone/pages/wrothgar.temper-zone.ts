import type { TemperZone } from "akasha/temper/catalog/world/temper-zone/temper-zone.page-type.types.ts"

export const wrothgar = {
  id: "019e17d9-4f39-70f6-89dc-75ceac137939",
  type: "page-type/temper-zone",
  slug: "wrothgar",
  title: "Wrothgar",
  dropsScripts: true,
  isDlc: true,
} as const satisfies TemperZone
