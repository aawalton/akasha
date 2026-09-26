import type { TemperBaseStat } from "akasha/temper/player/character/source/temper-base-stat/temper-base-stat.page-type.types.ts"

export const magickaRecovery = {
  id: "01a0df49-5528-70b0-a66c-54043b1ba4fe",
  type: "page-type/temper-base-stat",
  slug: "magicka-recovery",
  title: "Base Magicka Recovery",
  metric: "temper-metric/magicka-recovery",
  effectType: "integer",
  value: 513.5000095367432,
} as const satisfies TemperBaseStat
