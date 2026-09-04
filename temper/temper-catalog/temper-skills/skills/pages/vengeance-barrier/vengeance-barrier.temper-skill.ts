import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceBarrier = {
  id: "019e6f53-a8b9-7a78-be90-acbdd61452b0",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-barrier",
  title: "Vengeance Barrier",
  key: "vengeance-barrier",
  baseName: "Vengeance Barrier",
  description:
    '"Invoke defensive tactics to protect yourself and up to 2 nearby group members with wards that each absorb up to |cffffff60375|r damage for |cffffff15|r seconds."',
  icon: "/esoui/art/icons/ability_ava_006.dds",
  esoSkillId: 244725,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-alliance-war-support",
  skillType: "ultimate",
  subcategoryId: "vengeance-alliance-war-support",
} as const satisfies TemperSkill
