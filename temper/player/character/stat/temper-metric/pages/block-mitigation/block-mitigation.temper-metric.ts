import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const blockMitigation = {
  id: "01a0de67-c008-7fa4-81dc-787f327bac29",
  type: "page-type/temper-metric",
  slug: "block-mitigation",
  title: "Block Mitigation",
  category: "advanced",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_BLOCK_MITIGATION",
  esoStatValuePart: "percent",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
