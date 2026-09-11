import type { TemperSkillLine } from "akasha/temper/catalog/temper-skill/lines/temper-skill-line.page-type.types.ts"

export const worldVampire = {
  id: "019e61dc-f1d2-796a-81de-f4c8fffca45e",
  pageTypeSlug: "temper-skill-line",
  type: "temper-skill-line",
  slug: "world-vampire",
  title: "Vampire",
  key: "world-vampire",
  displayOrder: 35,
  esoSkillLineId: 51,
  maxRank: 10,
  subcategoryId: "world",
} as const satisfies TemperSkillLine
