import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionDamageTaken = {
  id: "01a0df07-1cd5-7c9c-90c3-5deca78fbb7c",
  type: "page-type/temper-metric",
  slug: "companion-damage-taken",
  title: "Damage Taken",
  subject: "companion",
  valueType: "fractional-change",
  effectType: "fractional-change",
  createdAt: "2026-09-26T18:43:00.437Z",
  updatedAt: "2026-09-26T18:43:39.000Z",
} as const satisfies TemperMetric
