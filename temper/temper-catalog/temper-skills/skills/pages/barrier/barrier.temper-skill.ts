import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const barrier = {
  id: "019e6f53-9eee-7814-aea1-0f8977df5222",
  pageTypeSlug: "temper-skill",
  slug: "barrier",
  title: "Barrier",
  key: "barrier",
  baseName: "Barrier",
  description:
    '"Invoke defensive tactics to protect yourself and nearby group members with wards that each absorb up to |cffffff41192|r damage for |cffffff30|r seconds."',
  icon: "/esoui/art/icons/ability_ava_006.dds",
  esoSkillId: 38573,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 0,
  rank: 6,
  skillLineId: "alliance-war-support",
  skillType: "ultimate",
  subcategoryId: "alliance-war-support",
} as const satisfies TemperSkill
