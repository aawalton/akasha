import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const martialAbilityStatusChance = {
  id: "01a0de67-c00b-7777-ad36-dea6f7ccc7fe",
  type: "page-type/temper-metric",
  slug: "martial-ability-status-chance",
  title: "Martial Status Chance (Ability)",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.459Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
