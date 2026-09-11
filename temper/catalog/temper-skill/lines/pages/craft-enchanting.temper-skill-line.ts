import type { TemperSkillLine } from "akasha/temper/catalog/temper-skill/lines/temper-skill-line.page-type.types.ts"

export const craftEnchanting = {
  id: "019e61dc-f1e4-7883-8757-c2abde68dc23",
  type: "temper-skill-line",
  slug: "craft-enchanting",
  title: "Enchanting",
  key: "craft-enchanting",
  displayOrder: 59,
  esoSkillLineId: 78,
  maxRank: 50,
  subcategoryId: "craft",
} as const satisfies TemperSkillLine
