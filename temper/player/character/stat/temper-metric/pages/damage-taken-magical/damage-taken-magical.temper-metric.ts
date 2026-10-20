import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageTakenMagical = {
  id: "01a1597a-4b0c-7fa2-a116-77ede6142ac3",
  type: "page-type/temper-metric",
  slug: "damage-taken-magical",
  title: "Magical Damage Taken",
  valueType: "fractional-change",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-10-20T13:22:29.260Z",
  updatedAt: "2026-10-20T13:22:29.260Z",
} as const satisfies TemperMetric
