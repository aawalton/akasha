import type { TemperSkillPoint } from "akasha/temper/player/character/temper-skill-point/temper-skill-point.page-type.types.ts"

export const ws = {
  id: "019e6471-1546-7631-b53c-6193793f1687",
  type: "page-type/temper-skill-point",
  slug: "ws",
  title: "Western Skyrim",
  key: "WS",
  displayOrder: 41,
  category: "zone",
  maxQuests: 3,
  maxSkyshards: 18,
  esoZoneId: 1160,
  skillPointQuests: "jsonl",
} as const satisfies TemperSkillPoint
