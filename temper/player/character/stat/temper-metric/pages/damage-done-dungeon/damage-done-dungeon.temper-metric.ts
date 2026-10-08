import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageDoneDungeon = {
  id: "01a0de67-c008-72c1-9e22-4ef694af6e0e",
  type: "page-type/temper-metric",
  slug: "damage-done-dungeon",
  title: "Damage Done (Dungeon)",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.456Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
