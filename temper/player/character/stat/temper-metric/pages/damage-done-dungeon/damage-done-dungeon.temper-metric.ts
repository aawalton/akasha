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
} as const satisfies TemperMetric
