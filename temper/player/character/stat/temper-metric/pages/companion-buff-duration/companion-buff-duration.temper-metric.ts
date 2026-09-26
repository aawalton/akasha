import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionBuffDuration = {
  id: "01a0df07-1cd4-732a-916b-4317dac7aef5",
  type: "page-type/temper-metric",
  slug: "companion-buff-duration",
  title: "Buff Duration",
  subject: "companion",
  valueType: "fractional-change",
  effectType: "fractional-change",
} as const satisfies TemperMetric
