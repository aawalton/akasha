import type { TemperSkillLine } from "akasha/temper/catalog/temper-skill/lines/temper-skill-line.page-type.types.ts"

export const necromancerGraveLord = {
  id: "019e61dc-f1b9-7e2b-ac98-0d75be1f6157",
  type: "temper-skill-line",
  slug: "necromancer-grave-lord",
  title: "Grave Lord",
  key: "necromancer-grave-lord",
  displayOrder: 16,
  esoSkillLineId: 131,
  maxRank: 50,
  subcategoryId: "character-class",
  class: "necromancer",
} as const satisfies TemperSkillLine
