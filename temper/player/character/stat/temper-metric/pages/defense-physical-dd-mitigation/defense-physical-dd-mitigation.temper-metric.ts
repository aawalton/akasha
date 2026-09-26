import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const defensePhysicalDdMitigation = {
  id: "01a0de67-c009-7baf-8578-cdca3ee5a720",
  type: "page-type/temper-metric",
  slug: "defense-physical-dd-mitigation",
  title: "Defense Physical Direct Mitigation",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
