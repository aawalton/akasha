import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionDpsDot = {
  id: "01a0df07-1cd5-72bb-98f9-25d02e628d38",
  type: "page-type/temper-metric",
  slug: "companion-dps-dot",
  title: "DoT Damage Per Second",
  subject: "companion",
  valueType: "integer",
} as const satisfies TemperMetric
