import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const powerWeapon = {
  id: "01a0de67-c00b-700c-aef8-ff235496893a",
  type: "page-type/temper-metric",
  slug: "power-weapon",
  title: "Weapon Power",
  category: "base",
  valueType: "integer",
  polarity: "higher-is-better",
  esoStatConstantName: "STAT_POWER",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
