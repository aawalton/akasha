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
  createdAt: "2026-09-26T15:48:56.457Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
