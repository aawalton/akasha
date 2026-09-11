import type { TemperSkillLine } from "akasha/temper/catalog/temper-skill/lines/temper-skill-line.page-type.types.ts"

export const nightbladeAssassination = {
  id: "019e61dc-f1af-73c9-8210-94ea9faf29f0",
  pageTypeSlug: "temper-skill-line",
  type: "temper-skill-line",
  slug: "nightblade-assassination",
  title: "Assassination",
  key: "nightblade-assassination",
  displayOrder: 10,
  esoSkillLineId: 38,
  maxRank: 50,
  subcategoryId: "character-class",
  class: "nightblade",
} as const satisfies TemperSkillLine
