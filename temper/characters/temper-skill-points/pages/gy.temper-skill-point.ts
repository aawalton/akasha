import type { TemperSkillPoint } from "akasha/temper/characters/temper-skill-points/temper-skill-point.page-type.types.ts"

export const gy = {
  id: "019e6471-154d-79c3-bdcf-b4c92a5e281e",
  type: "temper-skill-point",
  slug: "gy",
  title: "Galen",
  key: "GY",
  category: "zone",
  maxQuests: 9,
  maxSkyshards: 6,
} as const satisfies TemperSkillPoint
