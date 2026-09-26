import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const effectiveHealingWeapon = {
  id: "01a0de67-c009-75a2-a87c-9f2b3d802fa0",
  type: "page-type/temper-metric",
  slug: "effective-healing-weapon",
  title: "Effective Weapon Healing Power",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
