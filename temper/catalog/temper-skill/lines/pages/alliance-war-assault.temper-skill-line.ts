import type { TemperSkillLine } from "akasha/temper/catalog/temper-skill/lines/temper-skill-line.page-type.types.ts"

export const allianceWarAssault = {
  id: "019e61dc-f1ce-7741-a5c3-6915eac5e6b9",
  type: "temper-skill-line",
  slug: "alliance-war-assault",
  title: "Assault",
  key: "alliance-war-assault",
  displayOrder: 43,
  esoSkillLineId: 48,
  maxRank: 10,
  subcategoryId: "alliance-war",
} as const satisfies TemperSkillLine
