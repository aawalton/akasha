import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const adrenalineRush = {
  id: "019e624a-12bb-7319-8fe4-6abb0101350d",
  pageTypeSlug: "temper-skill",
  slug: "adrenaline-rush",
  title: "Adrenaline Rush",
  key: "adrenaline-rush",
  baseName: "Adrenaline Rush",
  description:
    '"When you deal damage, you restore 1005 Stamina. This effect can occur once every 5 seconds."',
  icon: "/esoui/art/icons/ability_armor_012.dds",
  esoSkillId: 45315,
  isMorph: false,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 3,
  skillLineId: "racial-redguard-skills",
  skillType: "passive",
  subcategoryId: "racial-redguard-skills",
  status: "unsupported",
} as const satisfies TemperSkill
