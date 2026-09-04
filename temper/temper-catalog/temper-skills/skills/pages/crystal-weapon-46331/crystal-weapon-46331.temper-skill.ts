import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const crystalWeapon46331 = {
  id: "019e6f53-a04c-7b6d-a308-894f759a73ca",
  pageTypeSlug: "temper-skill",
  slug: "crystal-weapon-46331",
  title: "Crystal Weapon",
  key: "crystal-weapon-46331",
  baseName: "Crystal Shard",
  description:
    '"Encase your weapon in dark crystals for |cffffff6|r seconds, causing your next two Light or Heavy Attacks to deal additional damage and reduce the target\'s Armor by |cffffff1000|r for |cffffff5|r seconds. The first hit deals |cffffff7269|r Physical Damage and the second deals |cffffff2907|r Physical Damage.\\n\\n After casting, your next non-Ultimate ability used within |cffffff3|r seconds costs |cffffff10|r% less."',
  icon: "/esoui/art/icons/ability_sorcerer_crystalweapon.dds",
  esoSkillId: 46331,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 1,
  skillLineId: "sorcerer-dark-magic",
  skillType: "active",
  subcategoryId: "sorcerer-dark-magic",
} as const satisfies TemperSkill
