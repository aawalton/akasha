import type { TemperSkillPoint } from "akasha/temper/characters/temper-skill-points/temper-skill-point.page-type.types.ts"

export const su = {
  id: "019e6471-1540-7ca1-85ee-778382605908",
  type: "temper-skill-point",
  slug: "su",
  title: "Summerset",
  key: "SU",
  category: "zone",
  maxQuests: 3,
  maxSkyshards: 18,
} as const satisfies TemperSkillPoint
