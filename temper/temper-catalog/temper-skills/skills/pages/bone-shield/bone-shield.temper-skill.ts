import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const boneShield = {
  id: "019e6f53-9f71-7693-8b74-335f863a0683",
  pageTypeSlug: "temper-skill",
  slug: "bone-shield",
  title: "Bone Shield",
  key: "bone-shield",
  baseName: "Bone Shield",
  description:
    '"Surround yourself with a whirlwind of bones, gaining a damage shield that absorbs up to |cffffff7026|r damage for |cffffff6|r seconds. This ability scales off your Max Health.\\n\\nAn ally near you can activate the Bone Wall synergy, granting the ally and up to |cffffff5|r other allies a damage shield equal to |cffffff35|r% of their Max Health for |cffffff6|r seconds."',
  icon: "/esoui/art/icons/ability_undaunted_005.dds",
  esoSkillId: 39369,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "guild-undaunted",
  skillType: "active",
  subcategoryId: "guild-undaunted",
} as const satisfies TemperSkill
