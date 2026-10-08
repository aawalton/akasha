import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionArmor = {
  id: "01a0df07-1cd4-7e53-ae43-6855ff1d9e2e",
  type: "page-type/temper-metric",
  slug: "companion-armor",
  title: "Armor",
  subject: "companion",
  valueType: "rating",
  divisor: 50000,
  cap: 0.5,
  formula: "ts",
  createdAt: "2026-09-26T18:43:00.436Z",
  updatedAt: "2026-09-26T18:43:39.000Z",
} as const satisfies TemperMetric
