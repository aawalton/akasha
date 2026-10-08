import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const healingCriticalBonusSpell = {
  id: "01a0de67-c00a-70da-b6e9-62419875d409",
  type: "page-type/temper-metric",
  slug: "healing-critical-bonus-spell",
  title: "Spell Critical Healing Bonus",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.458Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
