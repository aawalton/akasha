import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const defensePhysicalMitigation = {
  id: "01a0de67-c009-7979-aa22-5d8f9e9bf0fc",
  type: "page-type/temper-metric",
  slug: "defense-physical-mitigation",
  title: "Defense Physical Mitigation",
  category: "advanced",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_PHYSICAL_RESIST",
  esoStatValuePart: "percent",
  fullyImplemented: false,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.457Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
