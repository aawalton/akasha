import type { TemperBaseStat } from "akasha/temper/player/character/source/temper-base-stat/temper-base-stat.page-type.types.ts"

export const mountStaminaRegenMoving = {
  id: "01a0df49-5528-7d0f-a5b4-006aa4dbdbdc",
  type: "page-type/temper-base-stat",
  slug: "mount-stamina-regen-moving",
  title: "Base Mount Stamina Regen (Moving)",
  metric: "temper-metric/mount-stamina-regen-moving",
  effectType: "integer",
  value: 200,
} as const satisfies TemperBaseStat
