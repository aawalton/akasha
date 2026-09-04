import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const absorb30869 = {
  id: "019e6f53-9e80-70a4-a7d0-5c11407177a4",
  pageTypeSlug: "temper-skill",
  slug: "absorb-30869",
  title: "Absorb",
  key: "absorb-30869",
  baseName: "Absorb",
  description:
    '"Restores |cffffff300|r Magicka whenever you block an attack. This effect can occur once every |cffffff.25|r seconds."',
  icon: "/esoui/art/icons/ability_weapon_010.dds",
  esoSkillId: 30869,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 28,
  morphIndex: 0,
  rank: 28,
  skillLineId: "weapon-restoration-staff",
  skillType: "passive",
  subcategoryId: "weapon-restoration-staff",
} as const satisfies TemperSkill
