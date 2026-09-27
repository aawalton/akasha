import type { TemperSkillPoint } from "akasha/temper/player/character/temper-skill-point/temper-skill-point.page-type.types.ts"

export const dc5 = {
  id: "019e6471-152a-7d1c-a515-61c30d6cc623",
  type: "page-type/temper-skill-point",
  slug: "dc5",
  title: "Bangkorai",
  key: "DC5",
  displayOrder: 20,
  category: "zone",
  maxQuests: 3,
  maxSkyshards: 16,
  esoZoneId: 92,
  skillPointQuests: "jsonl",
} as const satisfies TemperSkillPoint
