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
  createdAt: "2026-09-26T15:48:56.456Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
