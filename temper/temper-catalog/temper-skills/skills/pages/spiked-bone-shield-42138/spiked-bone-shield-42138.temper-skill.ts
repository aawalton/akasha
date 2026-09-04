import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const spikedBoneShield42138 = {
  id: "019e6f53-a79d-768c-acac-27276f53e85f",
  pageTypeSlug: "temper-skill",
  slug: "spiked-bone-shield-42138",
  title: "Spiked Bone Shield",
  key: "spiked-bone-shield-42138",
  baseName: "Bone Shield",
  description:
    '"Surround yourself with a whirlwind of bones, gaining a damage shield that absorbs up to |cffffff7027|r damage for |cffffff6|r seconds and returns |cffffff100|r% of direct damage absorbed back to the enemy. This ability scales off your Max Health.\\n\\nAn ally near you can activate the Bone Wall synergy, granting the ally and up to |cffffff5|r other allies a damage shield equal to |cffffff35|r% of their Max Health for |cffffff6|r seconds."',
  icon: "/esoui/art/icons/ability_undaunted_005b.dds",
  esoSkillId: 42138,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 4,
  skillLineId: "guild-undaunted",
  skillType: "active",
  subcategoryId: "guild-undaunted",
} as const satisfies TemperSkill
