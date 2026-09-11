import type { TemperSkillLine } from "akasha/temper/catalog/temper-skill/lines/temper-skill-line.page-type.types.ts"

export const dragonknightEarthenHeart = {
  id: "019e61dc-f1a7-7f32-85f0-17e2f85b3b57",
  type: "temper-skill-line",
  slug: "dragonknight-earthen-heart",
  title: "Earthen Heart",
  key: "dragonknight-earthen-heart",
  displayOrder: 9,
  esoSkillLineId: 37,
  maxRank: 50,
  subcategoryId: "character-class",
  class: "dragonknight",
} as const satisfies TemperSkillLine
