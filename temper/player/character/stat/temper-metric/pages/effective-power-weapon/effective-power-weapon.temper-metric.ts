import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const effectivePowerWeapon = {
  id: "01a0de67-c009-72d8-8c98-5c90a769e358",
  type: "page-type/temper-metric",
  slug: "effective-power-weapon",
  title: "Effective Weapon Power",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
