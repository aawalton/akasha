import type { TemperBaseStat } from "akasha/temper/player/character/source/temper-base-stat/temper-base-stat.page-type.types.ts"

export const staminaRecovery = {
  id: "01a0df49-5528-76db-8fba-95e97cdb6422",
  type: "page-type/temper-base-stat",
  slug: "stamina-recovery",
  title: "Base Stamina Recovery",
  metric: "temper-metric/stamina-recovery",
  effectType: "integer",
  value: 513.5000095367432,
} as const satisfies TemperBaseStat
