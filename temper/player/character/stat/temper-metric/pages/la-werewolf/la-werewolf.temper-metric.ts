import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const laWerewolf = {
  id: "01a0de67-c00b-7550-82ce-e08b53516451",
  type: "page-type/temper-metric",
  slug: "la-werewolf",
  title: "LA Werewolf",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
