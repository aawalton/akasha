import type { TemperSkillLine } from "akasha/temper/catalog/temper-skill/lines/temper-skill-line.page-type.types.ts"

export const templarDawnsWrath = {
  id: "019e61dc-f1b3-7dbd-bfa7-06426cfc89cf",
  type: "temper-skill-line",
  slug: "templar-dawns-wrath",
  title: "Dawn's Wrath",
  key: "templar-dawns-wrath",
  displayOrder: 5,
  esoSkillLineId: 27,
  maxRank: 50,
  subcategoryId: "character-class",
  class: "templar",
} as const satisfies TemperSkillLine
