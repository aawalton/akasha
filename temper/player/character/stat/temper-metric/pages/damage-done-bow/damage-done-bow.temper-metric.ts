import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageDoneBow = {
  id: "01a0de67-c008-7dc2-987c-a310d60892c7",
  type: "page-type/temper-metric",
  slug: "damage-done-bow",
  title: "Damage Done (Bow)",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
