import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const medicinalUse = {
  id: "019e6224-cca2-7b34-8b49-5d7f4eacebf8",
  pageTypeSlug: "temper-skill",
  slug: "medicinal-use",
  title: "Medicinal Use",
  key: "medicinal-use",
  baseName: "Medicinal Use",
  description: '"When using potions, resulting effects last 30% longer."',
  icon: "/esoui/art/icons/ability_alchemy_004.dds",
  esoSkillId: 45573,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 8,
  morphIndex: 0,
  rank: 3,
  skillLineId: "craft-alchemy",
  skillType: "passive",
  subcategoryId: "craft-alchemy",
} as const satisfies TemperSkill
