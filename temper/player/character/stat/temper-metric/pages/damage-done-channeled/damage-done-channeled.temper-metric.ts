import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageDoneChanneled = {
  id: "01a0de67-c008-70cb-a771-09d49dc8b02a",
  type: "page-type/temper-metric",
  slug: "damage-done-channeled",
  title: "Damage Done (Channeled)",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.456Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
