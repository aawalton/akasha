import type { TemperBaseStat } from "akasha/temper/player/character/source/temper-base-stat/temper-base-stat.page-type.types.ts"

export const staminaSprintCost = {
  id: "01a0df49-5528-7a80-9682-acc07ca1f36f",
  type: "page-type/temper-base-stat",
  slug: "stamina-sprint-cost",
  title: "Base Sprint Cost",
  metric: "temper-metric/stamina-sprint-cost",
  effectType: "integer",
  value: 500,
  createdAt: "2026-09-26T19:55:20.232Z",
  updatedAt: "2026-09-26T19:55:28.000Z",
} as const satisfies TemperBaseStat
