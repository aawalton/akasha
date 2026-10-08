import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionDpsSingleTarget = {
  id: "01a0df07-1cd5-7a54-815c-f59cb81abc50",
  type: "page-type/temper-metric",
  slug: "companion-dps-single-target",
  title: "Single Target Damage Per Second",
  subject: "companion",
  valueType: "integer",
  createdAt: "2026-09-26T18:43:00.437Z",
  updatedAt: "2026-09-26T18:43:39.000Z",
} as const satisfies TemperMetric
