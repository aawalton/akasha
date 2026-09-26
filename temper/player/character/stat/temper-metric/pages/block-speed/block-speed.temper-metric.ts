import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const blockSpeed = {
  id: "01a0de67-c008-7154-ae56-e6ec02c7ebe0",
  type: "page-type/temper-metric",
  slug: "block-speed",
  title: "Block Speed",
  category: "advanced",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_BLOCK_SPEED",
  esoStatValuePart: "percent",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
