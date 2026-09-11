import type { TemperSkillLine } from "akasha/temper/catalog/temper-skill/lines/temper-skill-line.page-type.types.ts"

export const armorLightArmor = {
  id: "019e61dc-f1c7-70fd-a51d-9a85ce32df05",
  type: "temper-skill-line",
  slug: "armor-light-armor",
  title: "Light Armor",
  key: "armor-light-armor",
  displayOrder: 28,
  esoSkillLineId: 24,
  maxRank: 50,
  subcategoryId: "armor",
} as const satisfies TemperSkillLine
