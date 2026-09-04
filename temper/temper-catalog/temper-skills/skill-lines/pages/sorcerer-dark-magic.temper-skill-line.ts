import type { TemperSkillLine } from "../temper-skill-line.page-type.ts"

export const sorcererDarkMagic = {
  id: "019e61dc-f1ab-7caf-8c29-1210323134e6",
  pageTypeSlug: "temper-skill-line",
  slug: "sorcerer-dark-magic",
  title: "Dark Magic",
  key: "sorcerer-dark-magic",
  displayOrder: 13,
  esoSkillLineId: 41,
  maxRank: 50,
  subcategoryId: "character-class",
  class: "sorcerer",
} as const satisfies TemperSkillLine
