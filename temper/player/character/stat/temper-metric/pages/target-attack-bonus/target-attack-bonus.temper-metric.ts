import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const targetAttackBonus = {
  id: "01a0de67-c00c-706f-9be6-b288db4004cc",
  type: "page-type/temper-metric",
  slug: "target-attack-bonus",
  title: "Target Attack Bonus",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.460Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
