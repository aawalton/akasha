import type { TemperSkillLine } from "akasha/temper/catalog/temper-skill/lines/temper-skill-line.page-type.types.ts"

export const racialKhajiitSkills = {
  id: "019e61dc-f1dc-72f8-8fec-be125a2ed1f1",
  type: "temper-skill-line",
  slug: "racial-khajiit-skills",
  title: "Khajiit Skills",
  key: "racial-khajiit-skills",
  displayOrder: 49,
  esoSkillLineId: 58,
  maxRank: 50,
  subcategoryId: "racial",
} as const satisfies TemperSkillLine
