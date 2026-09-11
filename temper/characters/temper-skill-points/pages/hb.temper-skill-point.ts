import type { TemperSkillPoint } from "akasha/temper/characters/temper-skill-points/temper-skill-point.page-type.types.ts"

export const hb = {
  id: "019e6471-153b-75d0-9ee7-3a6656db0d55",
  type: "temper-skill-point",
  slug: "hb",
  title: "Hew's Bane",
  key: "HB",
  category: "zone",
  maxQuests: 6,
  maxSkyshards: 6,
} as const satisfies TemperSkillPoint
