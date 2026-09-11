import type { TemperSkillPoint } from "akasha/temper/characters/temper-skill-points/temper-skill-point.page-type.types.ts"

export const pvprank = {
  id: "019e6471-1516-7f99-b557-87e9aa36ee5e",
  type: "temper-skill-point",
  slug: "pvprank",
  title: "PvP Rank",
  key: "pvpRank",
  category: "general",
  maxValue: 50,
} as const satisfies TemperSkillPoint
