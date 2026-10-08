import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const healingDoneSingleTarget = {
  id: "01a0de67-c00a-784a-bd9f-922462d2ab60",
  type: "page-type/temper-metric",
  slug: "healing-done-single-target",
  title: "Single Target Healing Done",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.458Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
