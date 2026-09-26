import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageDoneDot = {
  id: "01a0de67-c008-79c4-82bf-34305b04a8ab",
  type: "page-type/temper-metric",
  slug: "damage-done-dot",
  title: "Damage Done (DOT)",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
