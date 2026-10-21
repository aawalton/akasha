import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const coreAbilityCost = {
  id: "01a15c54-3c50-7635-a501-455cc95138a3",
  type: "page-type/temper-metric",
  slug: "core-ability-cost",
  title: "Core Ability Cost",
  valueType: "fractional-change",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-10-21T02:39:46.767Z",
  updatedAt: "2026-10-21T02:39:46.767Z",
} as const satisfies TemperMetric
