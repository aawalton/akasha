import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const targetWeaponPower = {
  id: "01a0de67-c00d-7a7e-8bbd-0277cd4cf090",
  type: "page-type/temper-metric",
  slug: "target-weapon-power",
  title: "Target Weapon Power",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
