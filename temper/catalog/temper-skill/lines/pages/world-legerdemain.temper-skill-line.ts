import type { TemperSkillLine } from "akasha/temper/catalog/temper-skill/lines/temper-skill-line.page-type.types.ts"

export const worldLegerdemain = {
  id: "019e61dc-f1d4-7909-9480-26e907fd4166",
  pageTypeSlug: "temper-skill-line",
  type: "temper-skill-line",
  slug: "world-legerdemain",
  title: "Legerdemain",
  key: "world-legerdemain",
  displayOrder: 32,
  esoSkillLineId: 111,
  maxRank: 20,
  subcategoryId: "world",
} as const satisfies TemperSkillLine
