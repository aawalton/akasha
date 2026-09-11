import type { TemperSkillPoint } from "akasha/temper/characters/temper-skill-points/temper-skill-point.page-type.types.ts"

export const ic = {
  id: "019e6471-1538-7d45-947f-f9308e8ef790",
  type: "temper-skill-point",
  slug: "ic",
  title: "Imperial City",
  key: "IC",
  category: "zone",
  maxQuests: 1,
  maxSkyshards: 13,
} as const satisfies TemperSkillPoint
