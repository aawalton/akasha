import type { TemperSkillLine } from "../temper-skill-line.page-type.ts"

export const wardenAnimalCompanions = {
  id: "019e61dc-f1b5-7fde-a419-a90f82294c4c",
  pageTypeSlug: "temper-skill-line",
  slug: "warden-animal-companions",
  title: "Animal Companions",
  key: "warden-animal-companions",
  displayOrder: 1,
  esoSkillLineId: 127,
  maxRank: 50,
  subcategoryId: "character-class",
  class: "warden",
} as const satisfies TemperSkillLine
