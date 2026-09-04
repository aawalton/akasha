import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const siegeShield = {
  id: "019e6f53-a715-716d-81d5-1d978f702780",
  pageTypeSlug: "temper-skill",
  slug: "siege-shield",
  title: "Siege Shield",
  key: "siege-shield",
  baseName: "Siege Shield",
  description:
    '"Create a protective sphere over your location that reduces damage taken from siege weapons by |cffffff50|r% for you and nearby allies."',
  icon: "/esoui/art/icons/ability_ava_004.dds",
  esoSkillId: 38570,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 0,
  rank: 2,
  skillLineId: "alliance-war-support",
  skillType: "active",
  subcategoryId: "alliance-war-support",
} as const satisfies TemperSkill
