import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionPenetration = {
  id: "01a0df07-1cd5-711a-a0eb-670cae07608b",
  type: "page-type/temper-metric",
  slug: "companion-penetration",
  title: "Penetration",
  subject: "companion",
  valueType: "integer",
  effectType: "integer",
  createdAt: "2026-09-26T18:43:00.437Z",
  updatedAt: "2026-09-26T18:43:39.000Z",
} as const satisfies TemperMetric
