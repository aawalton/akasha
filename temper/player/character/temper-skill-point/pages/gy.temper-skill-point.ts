import type { TemperSkillPoint } from "akasha/temper/player/character/temper-skill-point/temper-skill-point.page-type.types.ts"

export const gy = {
  id: "019e6471-154d-79c3-bdcf-b4c92a5e281e",
  type: "page-type/temper-skill-point",
  slug: "gy",
  title: "Galen",
  key: "GY",
  displayOrder: 46,
  category: "zone",
  maxQuests: 9,
  maxSkyshards: 6,
  esoZoneId: 1383,
  skillPointQuests: "jsonl",
} as const satisfies TemperSkillPoint
