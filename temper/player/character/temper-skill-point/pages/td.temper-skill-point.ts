import type { TemperSkillPoint } from "akasha/temper/player/character/temper-skill-point/temper-skill-point.page-type.types.ts"

export const td = {
  id: "019e6471-154a-794a-9016-9612b0f4fb6e",
  type: "page-type/temper-skill-point",
  slug: "td",
  title: "The Deadlands",
  key: "TD",
  displayOrder: 44,
  category: "zone",
  maxQuests: 9,
  maxSkyshards: 6,
  esoZoneId: 1286,
  skillPointQuests: "jsonl",
} as const satisfies TemperSkillPoint
