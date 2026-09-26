import type { TemperBaseStat } from "akasha/temper/player/character/source/temper-base-stat/temper-base-stat.page-type.types.ts"

export const powerSpell = {
  id: "01a0df49-5528-7bd1-bccc-e26d9cc4fa81",
  type: "page-type/temper-base-stat",
  slug: "power-spell",
  title: "Base Spell Power",
  metric: "temper-metric/power-spell",
  effectType: "integer",
  value: 1000,
} as const satisfies TemperBaseStat
