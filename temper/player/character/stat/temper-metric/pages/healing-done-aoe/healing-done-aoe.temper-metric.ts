import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const healingDoneAoe = {
  id: "01a0de67-c00a-7976-878f-adbfaa3d1d4c",
  type: "page-type/temper-metric",
  slug: "healing-done-aoe",
  title: "AOE Healing Done",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
