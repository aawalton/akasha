import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionDamageDone = {
  id: "01a0df07-1cd5-797d-a0a1-55a688c70487",
  type: "page-type/temper-metric",
  slug: "companion-damage-done",
  title: "Damage Done",
  subject: "companion",
  valueType: "fractional-change",
  effectType: "fractional-change",
  createdAt: "2026-09-26T18:43:00.437Z",
  updatedAt: "2026-09-26T18:43:39.000Z",
} as const satisfies TemperMetric
