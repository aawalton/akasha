import type { TemperSkillPoint } from "akasha/temper/player/character/temper-skill-point/temper-skill-point.page-type.types.ts"

export const ne = {
  id: "019e6471-1543-7913-a26c-d17412724071",
  type: "page-type/temper-skill-point",
  slug: "ne",
  title: "Northern Elsweyr",
  key: "NE",
  displayOrder: 39,
  category: "zone",
  maxQuests: 3,
  maxSkyshards: 18,
  esoZoneId: 1086,
  skillPointQuests: "jsonl",
} as const satisfies TemperSkillPoint
