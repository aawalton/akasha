import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const statusEffectChance = {
  id: "01a0de67-c00c-7575-a792-e95b73ce999e",
  type: "page-type/temper-metric",
  slug: "status-effect-chance",
  title: "Status Effect Chance",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.460Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
