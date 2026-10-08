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
  createdAt: "2026-09-26T15:48:56.457Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
