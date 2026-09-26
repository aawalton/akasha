import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionDpsDirect = {
  id: "01a0df07-1cd5-7f87-9513-34c473fab232",
  type: "page-type/temper-metric",
  slug: "companion-dps-direct",
  title: "Direct Damage Per Second",
  subject: "companion",
  valueType: "integer",
} as const satisfies TemperMetric
