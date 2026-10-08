import type { TemperSkillPoint } from "akasha/temper/player/character/temper-skill-point/temper-skill-point.page-type.types.ts"

export const ap = {
  id: "019e6471-154e-7f7f-8613-cd8a2466b23b",
  type: "page-type/temper-skill-point",
  slug: "ap",
  title: "Apocrypha",
  key: "AP",
  displayOrder: 47,
  category: "zone",
  maxQuests: 9,
  maxSkyshards: 18,
  esoZoneId: 1413,
  skillPointQuests: "jsonl",
  createdAt: "2026-05-26T13:19:53.166Z",
  updatedAt: "2026-09-27T03:53:34.000Z",
} as const satisfies TemperSkillPoint
