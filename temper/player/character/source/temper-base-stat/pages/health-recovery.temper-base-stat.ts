import type { TemperBaseStat } from "akasha/temper/player/character/source/temper-base-stat/temper-base-stat.page-type.types.ts"

export const healthRecovery = {
  id: "01a0df49-5528-7d69-82a8-f27c04515bd5",
  type: "page-type/temper-base-stat",
  slug: "health-recovery",
  title: "Base Health Recovery",
  metric: "temper-metric/health-recovery",
  effectType: "integer",
  value: 309.4999952316284,
} as const satisfies TemperBaseStat
