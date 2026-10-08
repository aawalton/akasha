import type { TemperSkillPoint } from "akasha/temper/player/character/temper-skill-point/temper-skill-point.page-type.types.ts"

export const ic = {
  id: "019e6471-1538-7d45-947f-f9308e8ef790",
  type: "page-type/temper-skill-point",
  slug: "ic",
  title: "Imperial City",
  key: "IC",
  displayOrder: 31,
  category: "zone",
  maxQuests: 1,
  maxSkyshards: 13,
  pvp: true,
  esoZoneId: 584,
  skillPointQuests: "jsonl",
  createdAt: "2026-05-26T13:19:53.144Z",
  updatedAt: "2026-09-27T03:53:34.000Z",
} as const satisfies TemperSkillPoint
