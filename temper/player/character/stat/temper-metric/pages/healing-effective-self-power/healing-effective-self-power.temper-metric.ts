import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const healingEffectiveSelfPower = {
  id: "01a0de67-c00a-7ba3-b1be-901ac0b97407",
  type: "page-type/temper-metric",
  slug: "healing-effective-self-power",
  title: "Effective Self Healing Power",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.458Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
