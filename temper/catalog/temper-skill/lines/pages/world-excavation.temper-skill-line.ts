import type { TemperSkillLine } from "akasha/temper/catalog/temper-skill/lines/temper-skill-line.page-type.types.ts"

export const worldExcavation = {
  id: "019e61dc-f1d6-7739-88fd-88fb74b09951",
  type: "temper-skill-line",
  slug: "world-excavation",
  title: "Excavation",
  key: "world-excavation",
  displayOrder: 31,
  esoSkillLineId: 157,
  maxRank: 10,
  subcategoryId: "world",
} as const satisfies TemperSkillLine
