import type { TemperSkillPoint } from "akasha/temper/player/character/temper-skill-point/temper-skill-point.page-type.types.ts"

export const pvprank = {
  id: "019e6471-1516-7f99-b557-87e9aa36ee5e",
  type: "page-type/temper-skill-point",
  slug: "pvprank",
  title: "PvP Rank",
  key: "pvpRank",
  displayOrder: 4,
  category: "general",
  maxValue: 50,
  createdAt: "2026-05-26T13:19:53.110Z",
  updatedAt: "2026-09-27T02:16:19.000Z",
} as const satisfies TemperSkillPoint
