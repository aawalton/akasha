import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const assassinSBlade = {
  id: "019e6f53-9ecd-7230-9a97-33b99610bbc9",
  pageTypeSlug: "temper-skill",
  slug: "assassin-s-blade",
  title: "Assassin's Blade",
  key: "assassin-s-blade",
  baseName: "Assassin's Blade",
  description:
    '"Thrust a magic blade with lethal precision to stab an enemy, dealing |cffffff4036|r Magic Damage. Deals |cffffff300|r% more damage to enemies below |cffffff25|r% Health."',
  icon: "/esoui/art/icons/ability_nightblade_017.dds",
  esoSkillId: 33386,
  isMorph: false,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 0,
  rank: 20,
  skillLineId: "nightblade-assassination",
  skillType: "active",
  subcategoryId: "nightblade-assassination",
} as const satisfies TemperSkill
