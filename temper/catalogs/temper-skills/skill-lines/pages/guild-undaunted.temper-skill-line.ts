import type { TemperSkillLine } from "../temper-skill-line.page-type.ts"

export const guildUndaunted = {
  id: "019e61dc-f1ca-772f-a621-ae41dd793b57",
  pageTypeSlug: "temper-skill-line",
  slug: "guild-undaunted",
  title: "Undaunted",
  key: "guild-undaunted",
  displayOrder: 42,
  esoSkillLineId: 55,
  maxRank: 10,
  subcategoryId: "guild",
} as const satisfies TemperSkillLine
