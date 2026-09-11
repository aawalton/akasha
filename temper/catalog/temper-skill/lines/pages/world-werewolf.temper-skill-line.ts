import type { TemperSkillLine } from "akasha/temper/catalog/temper-skill/lines/temper-skill-line.page-type.types.ts"

export const worldWerewolf = {
  id: "019e61dc-f1d3-77f9-9922-91b2f42640eb",
  type: "temper-skill-line",
  slug: "world-werewolf",
  title: "Werewolf",
  key: "world-werewolf",
  displayOrder: 36,
  esoSkillLineId: 50,
  maxRank: 10,
  subcategoryId: "world",
} as const satisfies TemperSkillLine
