import type { TemperSkillPoint } from "akasha/temper/player/character/temper-skill-point/temper-skill-point.page-type.types.ts"

export const ch = {
  id: "019e6471-1535-7244-bedb-0fdba875074b",
  type: "page-type/temper-skill-point",
  slug: "ch",
  title: "Coldharbour",
  key: "CH",
  category: "zone",
  maxQuests: 3,
  maxSkyshards: 16,
} as const satisfies TemperSkillPoint
