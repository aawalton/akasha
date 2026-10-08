import type { TemperSkillPoint } from "akasha/temper/player/character/temper-skill-point/temper-skill-point.page-type.types.ts"

export const se = {
  id: "019e6471-1544-7f56-84e2-56bf85151811",
  type: "page-type/temper-skill-point",
  slug: "se",
  title: "Southern Elsweyr",
  key: "SE",
  displayOrder: 40,
  category: "zone",
  maxQuests: 9,
  maxSkyshards: 6,
  esoZoneId: 1133,
  skillPointQuests: "jsonl",
  createdAt: "2026-05-26T13:19:53.156Z",
  updatedAt: "2026-09-27T03:53:34.000Z",
} as const satisfies TemperSkillPoint
