import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageDoneTrial = {
  id: "01a0de67-c009-7924-ae3d-205c0173a47a",
  type: "page-type/temper-metric",
  slug: "damage-done-trial",
  title: "Damage Done (Trial)",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
