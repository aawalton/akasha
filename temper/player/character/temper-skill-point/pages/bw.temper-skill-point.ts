import type { TemperSkillPoint } from "akasha/temper/player/character/temper-skill-point/temper-skill-point.page-type.types.ts"

export const bw = {
  id: "019e6471-1549-734c-bbd4-4ceb979e4243",
  type: "page-type/temper-skill-point",
  slug: "bw",
  title: "Blackwood",
  key: "BW",
  displayOrder: 43,
  category: "zone",
  maxQuests: 3,
  maxSkyshards: 18,
  esoZoneId: 1261,
  skillPointQuests: "jsonl",
  createdAt: "2026-05-26T13:19:53.161Z",
  updatedAt: "2026-09-27T03:53:34.000Z",
} as const satisfies TemperSkillPoint
