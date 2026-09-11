import type { TemperSkillPoint } from "akasha/temper/characters/temper-skill-points/temper-skill-point.page-type.types.ts"

export const se = {
  id: "019e6471-1544-7f56-84e2-56bf85151811",
  type: "temper-skill-point",
  slug: "se",
  title: "Southern Elsweyr",
  key: "SE",
  category: "zone",
  maxQuests: 9,
  maxSkyshards: 6,
} as const satisfies TemperSkillPoint
