import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const attackCritDamageWeapon = {
  id: "01a0de67-c007-7244-8abc-46ca0271c164",
  type: "page-type/temper-metric",
  slug: "attack-crit-damage-weapon",
  title: "Attack Weapon Critical Damage",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
