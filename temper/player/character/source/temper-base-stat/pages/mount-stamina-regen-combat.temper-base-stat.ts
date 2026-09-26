import type { TemperBaseStat } from "akasha/temper/player/character/source/temper-base-stat/temper-base-stat.page-type.types.ts"

export const mountStaminaRegenCombat = {
  id: "01a0df49-5528-7f8e-8377-4f0036d7d789",
  type: "page-type/temper-base-stat",
  slug: "mount-stamina-regen-combat",
  title: "Base Mount Stamina Regen (Combat)",
  metric: "temper-metric/mount-stamina-regen-combat",
  effectType: "integer",
  value: 100,
} as const satisfies TemperBaseStat
