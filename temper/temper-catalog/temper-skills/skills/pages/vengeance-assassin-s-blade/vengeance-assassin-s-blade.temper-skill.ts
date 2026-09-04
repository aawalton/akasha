import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceAssassinSBlade = {
  id: "019e6f53-a8b6-7d9b-b350-31e036c27ab0",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-assassin-s-blade",
  title: "Vengeance Assassin's Blade",
  key: "vengeance-assassin-s-blade",
  baseName: "Vengeance Assassin's Blade",
  description:
    '"Thrust a magic blade with lethal precision to stab an enemy, dealing |cffffff5565|r Magic Damage. Deals |cffffff300|r% more damage to enemies below |cffffff25|r% Health."',
  icon: "/esoui/art/icons/ability_nightblade_017.dds",
  esoSkillId: 237603,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-nightblade-assassination",
  skillType: "active",
  subcategoryId: "vengeance-nightblade-assassination",
} as const satisfies TemperSkill
