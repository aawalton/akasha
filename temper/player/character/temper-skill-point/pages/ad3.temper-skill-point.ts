import type { TemperSkillPoint } from "akasha/temper/player/character/temper-skill-point/temper-skill-point.page-type.types.ts"

export const ad3 = {
  id: "019e6471-151f-7f70-9fe0-28be1d742a75",
  type: "page-type/temper-skill-point",
  slug: "ad3",
  title: "Greenshade",
  key: "AD3",
  displayOrder: 11,
  category: "zone",
  maxQuests: 3,
  maxSkyshards: 16,
  esoZoneId: 108,
  skillPointQuests: "jsonl",
} as const satisfies TemperSkillPoint
