import type { TemperSkillPoint } from "akasha/temper/player/character/temper-skill-point/temper-skill-point.page-type.types.ts"

export const so = {
  id: "019e6471-1551-7a95-8fc8-4c8ad6c5cbd7",
  type: "page-type/temper-skill-point",
  slug: "so",
  title: "Solstice",
  key: "SO",
  displayOrder: 49,
  category: "zone",
  maxQuests: 9,
  maxSkyshards: 18,
  esoZoneId: 1502,
  skillPointQuests: "jsonl",
} as const satisfies TemperSkillPoint
