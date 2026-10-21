import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const defensePoisonMitigation = {
  id: "01a15c94-b735-706b-93c8-21fe6a616c0a",
  type: "page-type/temper-metric",
  slug: "defense-poison-mitigation",
  title: "Defense Poison Mitigation",
  category: "advanced",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_POISON_RESIST",
  esoStatValuePart: "percent",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-10-21T03:50:12.533Z",
  updatedAt: "2026-10-21T03:50:12.533Z",
} as const satisfies TemperMetric
