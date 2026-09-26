import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageDoneHeavyAttack = {
  id: "01a0de67-c008-79aa-8a64-045314a7e4ee",
  type: "page-type/temper-metric",
  slug: "damage-done-heavy-attack",
  title: "Damage Done (Heavy Attack)",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
