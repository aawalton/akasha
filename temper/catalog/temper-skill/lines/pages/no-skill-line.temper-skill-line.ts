import type { TemperSkillLine } from "akasha/temper/catalog/temper-skill/lines/temper-skill-line.page-type.types.ts"

export const noSkillLine = {
  id: "019e61dc-f19f-759a-adff-9ead12469f07",
  type: "temper-skill-line",
  slug: "no-skill-line",
  title: "No Skill Line",
  key: "no-skill-line",
  displayOrder: 0,
  esoSkillLineId: 0,
  maxRank: 0,
  subcategoryId: "none",
} as const satisfies TemperSkillLine
