import type { TemperSkillLine } from "akasha/temper/catalog/temper-skill/lines/temper-skill-line.page-type.types.ts"

export const racialDarkElfSkills = {
  id: "019e61dc-f1d9-76f9-8952-7b62665de0e6",
  type: "temper-skill-line",
  slug: "racial-dark-elf-skills",
  title: "Dark Elf Skills",
  key: "racial-dark-elf-skills",
  displayOrder: 54,
  esoSkillLineId: 64,
  maxRank: 50,
  subcategoryId: "racial",
} as const satisfies TemperSkillLine
