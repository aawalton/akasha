import type { TemperSkillPoint } from "akasha/temper/player/character/temper-skill-point/temper-skill-point.page-type.types.ts"

export const ep4 = {
  id: "019e6471-1532-7a44-944a-3ccae0a54057",
  type: "page-type/temper-skill-point",
  slug: "ep4",
  title: "Eastmarch",
  key: "EP4",
  category: "zone",
  maxQuests: 3,
  maxSkyshards: 16,
} as const satisfies TemperSkillPoint
