import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionTpsShield = {
  id: "01a0df07-1cd5-76a7-a8ac-0f4f087e5b31",
  type: "page-type/temper-metric",
  slug: "companion-tps-shield",
  title: "Shields Per Second",
  subject: "companion",
  valueType: "integer",
  createdAt: "2026-09-26T18:43:00.437Z",
  updatedAt: "2026-09-26T18:43:39.000Z",
} as const satisfies TemperMetric
