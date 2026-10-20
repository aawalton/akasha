import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageTakenMartial = {
  id: "01a1597a-4b0d-737b-b025-99733f1e301f",
  type: "page-type/temper-metric",
  slug: "damage-taken-martial",
  title: "Martial Damage Taken",
  valueType: "fractional-change",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-10-20T13:22:29.260Z",
  updatedAt: "2026-10-20T13:22:29.260Z",
} as const satisfies TemperMetric
