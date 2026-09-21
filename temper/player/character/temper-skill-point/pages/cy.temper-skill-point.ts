import type { TemperSkillPoint } from "akasha/temper/player/character/temper-skill-point/temper-skill-point.page-type.types.ts"

export const cy = {
  id: "019e6471-1536-7600-93a8-5bef9d916a03",
  type: "page-type/temper-skill-point",
  slug: "cy",
  title: "Cyrodiil",
  key: "CY",
  category: "zone",
  maxQuests: 0,
  maxSkyshards: 46,
  pvp: true,
} as const satisfies TemperSkillPoint
