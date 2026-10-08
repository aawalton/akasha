import type { TemperBaseStat } from "akasha/temper/player/character/source/temper-base-stat/temper-base-stat.page-type.types.ts"

export const powerWeapon = {
  id: "01a0df49-5528-776c-9981-299f40e62c70",
  type: "page-type/temper-base-stat",
  slug: "power-weapon",
  title: "Base Weapon Power",
  metric: "temper-metric/power-weapon",
  effectType: "integer",
  value: 1000,
  createdAt: "2026-09-26T19:55:20.232Z",
  updatedAt: "2026-09-26T19:55:28.000Z",
} as const satisfies TemperBaseStat
