import type { TemperSkillPoint } from "akasha/temper/player/character/temper-skill-point/temper-skill-point.page-type.types.ts"

export const tr = {
  id: "019e6471-1547-7cdb-a30a-1792799852da",
  type: "page-type/temper-skill-point",
  slug: "tr",
  title: "The Reach",
  key: "TR",
  displayOrder: 42,
  category: "zone",
  maxQuests: 9,
  maxSkyshards: 6,
  esoZoneId: 1207,
  skillPointQuests: "jsonl",
} as const satisfies TemperSkillPoint
