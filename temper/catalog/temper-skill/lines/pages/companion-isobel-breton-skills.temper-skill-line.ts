import type { TemperSkillLine } from "akasha/temper/catalog/temper-skill/lines/temper-skill-line.page-type.types.ts"

export const companionIsobelBretonSkills = {
  id: "019e61dc-f20b-7328-ae6d-cd4fb71e6e3c",
  type: "temper-skill-line",
  slug: "companion-isobel-breton-skills",
  title: "Breton Skills",
  key: "companion-isobel-breton-skills",
  displayOrder: 90,
  esoSkillLineId: 203,
  maxRank: 1,
  subcategoryId: "companion",
} as const satisfies TemperSkillLine
