import type { TemperSkillLine } from "akasha/temper/catalog/temper-skill/lines/temper-skill-line.page-type.types.ts"

export const craftBlacksmithing = {
  id: "019e61dc-f1e2-7613-897e-7be723200280",
  type: "temper-skill-line",
  slug: "craft-blacksmithing",
  title: "Blacksmithing",
  key: "craft-blacksmithing",
  displayOrder: 57,
  esoSkillLineId: 79,
  maxRank: 50,
  subcategoryId: "craft",
} as const satisfies TemperSkillLine
