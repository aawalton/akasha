import type { TemperSkillLine } from "akasha/temper/catalog/temper-skill/lines/temper-skill-line.page-type.types.ts"

export const racialBretonSkills = {
  id: "019e61dc-f1d8-77ef-8feb-06d05f0c8ed1",
  type: "temper-skill-line",
  slug: "racial-breton-skills",
  title: "Breton Skills",
  key: "racial-breton-skills",
  displayOrder: 51,
  esoSkillLineId: 60,
  maxRank: 50,
  subcategoryId: "racial",
} as const satisfies TemperSkillLine
