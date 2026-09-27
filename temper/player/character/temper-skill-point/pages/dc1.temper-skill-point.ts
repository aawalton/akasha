import type { TemperSkillPoint } from "akasha/temper/player/character/temper-skill-point/temper-skill-point.page-type.types.ts"

export const dc1 = {
  id: "019e6471-1525-7fd8-b91e-069228dceca5",
  type: "page-type/temper-skill-point",
  slug: "dc1",
  title: "Glenumbra",
  key: "DC1",
  displayOrder: 16,
  category: "zone",
  maxQuests: 4,
  maxSkyshards: 16,
  esoZoneId: 3,
  skillPointQuests: "jsonl",
} as const satisfies TemperSkillPoint
