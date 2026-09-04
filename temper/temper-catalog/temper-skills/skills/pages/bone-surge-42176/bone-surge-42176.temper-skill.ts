import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const boneSurge42176 = {
  id: "019e6f53-9f74-7154-a337-ddfc46c60d00",
  pageTypeSlug: "temper-skill",
  slug: "bone-surge-42176",
  title: "Bone Surge",
  key: "bone-surge-42176",
  baseName: "Bone Shield",
  description:
    '"Surround yourself with a whirlwind of bones, gaining a damage shield that absorbs up to |cffffff7258|r damage for |cffffff6|r seconds. This ability scales off your Max Health.\\n\\nAn ally near you can activate the Spinal Surge synergy, granting up to |cffffff6|r allies a damage shield that absorbs up to |cffffff35|r% of their Max Health for |cffffff6|r seconds and Major Vitality, increasing their healing received and damage shield strength by |cffffff12|r%."',
  icon: "/esoui/art/icons/ability_undaunted_005a.dds",
  esoSkillId: 42176,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 4,
  skillLineId: "guild-undaunted",
  skillType: "active",
  subcategoryId: "guild-undaunted",
} as const satisfies TemperSkill
