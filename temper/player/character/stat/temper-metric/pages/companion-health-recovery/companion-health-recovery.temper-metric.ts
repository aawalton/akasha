import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionHealthRecovery = {
  id: "01a0df07-1cd5-7e05-aa3c-aeee6a207310",
  type: "page-type/temper-metric",
  slug: "companion-health-recovery",
  title: "Health Recovery",
  subject: "companion",
  valueType: "fractional-change",
  effectType: "fractional-change",
} as const satisfies TemperMetric
