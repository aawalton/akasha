import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageTakenDot = {
  id: "01a0de67-c009-7768-97e3-547947e25430",
  type: "page-type/temper-metric",
  slug: "damage-taken-dot",
  title: "Damage Taken (DOT)",
  valueType: "fractional-change",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
