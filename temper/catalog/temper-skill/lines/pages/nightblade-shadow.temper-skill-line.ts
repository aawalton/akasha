import type { TemperSkillLine } from "akasha/temper/catalog/temper-skill/lines/temper-skill-line.page-type.types.ts"

export const nightbladeShadow = {
  id: "019e61dc-f1b0-755b-90b5-336927c6210d",
  pageTypeSlug: "temper-skill-line",
  type: "temper-skill-line",
  slug: "nightblade-shadow",
  title: "Shadow",
  key: "nightblade-shadow",
  displayOrder: 11,
  esoSkillLineId: 39,
  maxRank: 50,
  subcategoryId: "character-class",
  class: "nightblade",
} as const satisfies TemperSkillLine
