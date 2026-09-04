import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceHealingSeed = {
  id: "019e6f53-a923-730d-83a6-59d1c6644fb8",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-healing-seed",
  title: "Vengeance Healing Seed",
  key: "vengeance-healing-seed",
  baseName: "Vengeance Healing Seed",
  description:
    '"Summon a field of flowers which blooms after |cffffff6|r seconds, healing up to 3 of you and your allies in the area for |cffffff16065|r Health."',
  icon: "/esoui/art/icons/ability_warden_007.dds",
  esoSkillId: 238055,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-warden-green-balance",
  skillType: "active",
  subcategoryId: "vengeance-warden-green-balance",
} as const satisfies TemperSkill
