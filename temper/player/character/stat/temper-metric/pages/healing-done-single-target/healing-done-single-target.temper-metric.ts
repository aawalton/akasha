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
} as const satisfies TemperMetric
