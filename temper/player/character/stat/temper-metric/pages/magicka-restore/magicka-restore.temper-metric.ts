import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const magickaRestore = {
  id: "01a0de67-c00b-792d-99fa-8f8b236e7672",
  type: "page-type/temper-metric",
  slug: "magicka-restore",
  title: "Restore Magicka",
  valueType: "number-per-second",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
