import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionHealingDone = {
  id: "01a0df07-1cd5-7518-9a01-e4ac45e0da39",
  type: "page-type/temper-metric",
  slug: "companion-healing-done",
  title: "Healing Done",
  subject: "companion",
  valueType: "fractional-change",
  effectType: "fractional-change",
} as const satisfies TemperMetric
