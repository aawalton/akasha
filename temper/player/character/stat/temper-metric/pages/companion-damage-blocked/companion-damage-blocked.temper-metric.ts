import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionDamageBlocked = {
  id: "01a0df07-1cd4-7189-9fd0-ba57bd961368",
  type: "page-type/temper-metric",
  slug: "companion-damage-blocked",
  title: "Damage Blocked",
  subject: "companion",
  valueType: "fractional-change",
  effectType: "fractional-change",
} as const satisfies TemperMetric
