import type { TemperSkillPoint } from "akasha/temper/characters/temper-skill-points/temper-skill-point.page-type.types.ts"

export const td = {
  id: "019e6471-154a-794a-9016-9612b0f4fb6e",
  type: "temper-skill-point",
  slug: "td",
  title: "The Deadlands",
  key: "TD",
  category: "zone",
  maxQuests: 9,
  maxSkyshards: 6,
} as const satisfies TemperSkillPoint
