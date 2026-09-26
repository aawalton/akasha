import type { TemperBaseStat } from "akasha/temper/player/character/source/temper-base-stat/temper-base-stat.page-type.types.ts"

export const staminaMaximum = {
  id: "01a0df49-5528-7bf2-bb62-2363ce6ed64b",
  type: "page-type/temper-base-stat",
  slug: "stamina-maximum",
  title: "Base Max Stamina",
  metric: "temper-metric/stamina-maximum",
  effectType: "integer",
  value: 12000,
} as const satisfies TemperBaseStat
