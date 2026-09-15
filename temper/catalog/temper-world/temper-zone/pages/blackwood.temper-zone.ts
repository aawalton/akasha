import type { TemperZone } from "akasha/temper/catalog/temper-world/temper-zone/temper-zone.page-type.types.ts"

export const blackwood = {
  id: "019e17d9-4830-794d-95d8-cd508fb900b1",
  type: "page-type/temper-zone",
  slug: "blackwood",
  title: "Blackwood",
  dropsScripts: true,
  isDlc: true,
} as const satisfies TemperZone
