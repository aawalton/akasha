import type { TemperZone } from "akasha/temper/catalog/temper-world/temper-zones/temper-zone.page-type.types.ts"

export const vvardenfell = {
  id: "019e17d9-51b7-7af7-9b26-5b6c4a76378e",
  pageTypeSlug: "temper-zone",
  type: "temper-zone",
  slug: "vvardenfell",
  title: "Vvardenfell",
  dropsScripts: true,
  isDlc: true,
} as const satisfies TemperZone
