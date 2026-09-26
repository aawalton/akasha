import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageDoneSingleTarget = {
  id: "01a0de67-c009-7213-9dc9-63e40d0e9967",
  type: "page-type/temper-metric",
  slug: "damage-done-single-target",
  title: "Damage Done (Single Target)",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
