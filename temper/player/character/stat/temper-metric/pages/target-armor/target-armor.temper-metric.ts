import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const targetArmor = {
  id: "01a0de67-c00c-7944-bf65-c973e51b1ab7",
  type: "page-type/temper-metric",
  slug: "target-armor",
  title: "Target Armor",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
