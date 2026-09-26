import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageDoneBase = {
  id: "01a0de67-c008-76ee-8427-1087ecdd275c",
  type: "page-type/temper-metric",
  slug: "damage-done-base",
  title: "Damage Done",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
