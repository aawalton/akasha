import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageDoneStatusEffect = {
  id: "01a0de67-c009-7e0e-9a82-a8e3eda00e52",
  type: "page-type/temper-metric",
  slug: "damage-done-status-effect",
  title: "Damage Done (Status Effect)",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.457Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
