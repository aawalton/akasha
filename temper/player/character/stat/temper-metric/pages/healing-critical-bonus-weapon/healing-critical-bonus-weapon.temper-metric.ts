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
} as const satisfies TemperMetric
