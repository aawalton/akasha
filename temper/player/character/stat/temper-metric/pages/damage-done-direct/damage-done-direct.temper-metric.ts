import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageDoneDirect = {
  id: "01a0de67-c008-7d54-9cd9-840bd21e3ad4",
  type: "page-type/temper-metric",
  slug: "damage-done-direct",
  title: "Damage Done (Direct)",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
