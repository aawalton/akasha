import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const defensePhysicalAoeMitigation = {
  id: "01a0de67-c009-78ad-b4e8-a301294bc7f5",
  type: "page-type/temper-metric",
  slug: "defense-physical-aoe-mitigation",
  title: "Defense Physical AOE Mitigation",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.457Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
