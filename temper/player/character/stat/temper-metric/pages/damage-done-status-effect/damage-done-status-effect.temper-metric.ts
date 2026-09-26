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
} as const satisfies TemperMetric
