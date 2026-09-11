import type { TemperSkillLine } from "akasha/temper/catalog/temper-skill/lines/temper-skill-line.page-type.types.ts"

export const companionSharedTwoHanded = {
  id: "019e61dc-f1e9-763c-a9c8-3a5a3d7bad86",
  type: "temper-skill-line",
  slug: "companion-shared-two-handed",
  title: "Two Handed",
  key: "companion-shared-two-handed",
  displayOrder: 63,
  esoSkillLineId: 180,
  maxRank: 20,
  subcategoryId: "companion",
} as const satisfies TemperSkillLine
