import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const healingCriticalBonusWeapon = {
  id: "01a0de67-c00a-7ab3-a12b-43361fe0a935",
  type: "page-type/temper-metric",
  slug: "healing-critical-bonus-weapon",
  title: "Weapon Critical Healing Bonus",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.458Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
