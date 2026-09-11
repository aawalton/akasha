import type { TemperSkillLine } from "akasha/temper/catalog/temper-skill/lines/temper-skill-line.page-type.types.ts"

export const companionSharedMediumArmor = {
  id: "019e61dc-f1f2-7041-aee1-03f11ed86d9a",
  type: "temper-skill-line",
  slug: "companion-shared-medium-armor",
  title: "Medium Armor",
  key: "companion-shared-medium-armor",
  displayOrder: 70,
  esoSkillLineId: 187,
  maxRank: 20,
  subcategoryId: "companion",
} as const satisfies TemperSkillLine
