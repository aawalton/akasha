import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageDoneAoe = {
  id: "01a0de67-c008-7524-8d8c-36179a1d305c",
  type: "page-type/temper-metric",
  slug: "damage-done-aoe",
  title: "Damage Done (AOE)",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
