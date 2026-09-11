import type { TemperSkillPoint } from "akasha/temper/characters/temper-skill-points/temper-skill-point.page-type.types.ts"

export const hi = {
  id: "019e6471-154c-706b-bcb5-539a890b91ed",
  type: "temper-skill-point",
  slug: "hi",
  title: "High Isle",
  key: "HI",
  category: "zone",
  maxQuests: 5,
  maxSkyshards: 18,
} as const satisfies TemperSkillPoint
