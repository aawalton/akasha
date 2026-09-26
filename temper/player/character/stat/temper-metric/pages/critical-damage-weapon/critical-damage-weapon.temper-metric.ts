import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const criticalDamageWeapon = {
  id: "01a0de67-c008-7ea0-94ed-4c0c8e1f8422",
  type: "page-type/temper-metric",
  slug: "critical-damage-weapon",
  title: "Weapon Critical Damage",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
