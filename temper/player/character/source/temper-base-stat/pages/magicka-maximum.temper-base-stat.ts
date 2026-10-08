import type { TemperBaseStat } from "akasha/temper/player/character/source/temper-base-stat/temper-base-stat.page-type.types.ts"

export const magickaMaximum = {
  id: "01a0df49-5528-7cf5-85a0-a2704a5f375c",
  type: "page-type/temper-base-stat",
  slug: "magicka-maximum",
  title: "Base Max Magicka",
  metric: "temper-metric/magicka-maximum",
  effectType: "integer",
  value: 12000,
  createdAt: "2026-09-26T19:55:20.232Z",
  updatedAt: "2026-09-26T19:55:28.000Z",
} as const satisfies TemperBaseStat
