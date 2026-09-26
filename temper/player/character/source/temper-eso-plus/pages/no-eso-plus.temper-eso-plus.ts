import type { TemperEsoPlus } from "akasha/temper/player/character/source/temper-eso-plus/temper-eso-plus.page-type.types.ts"

export const noEsoPlus = {
  id: "01a0df67-9204-7d42-a875-ecdb44bffc77",
  type: "page-type/temper-eso-plus",
  slug: "no-eso-plus",
  title: "No ESO Plus",
  description: "No ESO Plus subscription active",
  hashPlace: 0,
} as const satisfies TemperEsoPlus
