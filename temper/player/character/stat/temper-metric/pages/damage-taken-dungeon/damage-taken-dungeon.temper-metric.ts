import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageTakenDungeon = {
  id: "01a0de67-c009-754d-9f97-8e61d04917f7",
  type: "page-type/temper-metric",
  slug: "damage-taken-dungeon",
  title: "Damage Taken (Dungeon)",
  valueType: "fractional-change",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.457Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
