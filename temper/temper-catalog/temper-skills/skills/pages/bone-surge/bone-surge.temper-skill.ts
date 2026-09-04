import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const boneSurge = {
  id: "019e6238-c29b-7e54-8f20-5a193d0b1033",
  pageTypeSlug: "temper-skill",
  slug: "bone-surge",
  title: "Bone Surge",
  key: "bone-surge",
  baseName: "Bone Shield",
  description:
    '"Surround yourself with a whirlwind of bones, gaining a damage shield that absorbs up to 5121 damage for 6 seconds. This ability scales off your Max Health.\\n\\nAn ally near you can activate the Spinal Surge synergy, granting up to 6 allies a damage shield that absorbs up to 30% of their Max Health for 6 seconds and Major Vitality, increasing their healing received and damage shield strength by 12%."',
  icon: "/esoui/art/icons/ability_undaunted_005a.dds",
  esoSkillId: 43334,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "guild-undaunted",
  skillType: "active",
  subcategoryId: "guild-undaunted",
} as const satisfies TemperSkill
