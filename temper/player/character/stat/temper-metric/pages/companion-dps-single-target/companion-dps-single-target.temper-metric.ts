import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionDpsSingleTarget = {
  id: "01a0df07-1cd5-7a54-815c-f59cb81abc50",
  type: "page-type/temper-metric",
  slug: "companion-dps-single-target",
  title: "Single Target Damage Per Second",
  subject: "companion",
  valueType: "integer",
} as const satisfies TemperMetric
