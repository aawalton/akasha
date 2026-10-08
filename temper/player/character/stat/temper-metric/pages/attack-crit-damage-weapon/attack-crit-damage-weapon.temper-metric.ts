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
  createdAt: "2026-09-26T15:48:56.455Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
