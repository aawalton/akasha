import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const crystalWeapon = {
  id: "019e6245-a62a-7d81-ad96-56d92097d6d0",
  type: "page-type/temper-skill",
  slug: "crystal-weapon",
  title: "Crystal Weapon",
  key: "crystal-weapon",
  baseName: "Crystal Shard",
  description:
    '"Encase your weapon in dark crystals for 6 seconds, causing your next two Light or Heavy Attacks to deal additional damage and reduce the target\'s Armor by 1000 for 5 seconds. The first hit deals 2091 Physical Damage and the second deals 836 Physical Damage.\\n\\n After casting, your next non-Ultimate ability used within 3 seconds costs 10% less."',
  icon: "/esoui/art/icons/ability_sorcerer_crystalweapon.dds",
  esoSkillId: 47560,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/sorcerer-dark-magic",
  skillType: "temper-skill-type/active",
} as const satisfies TemperSkill
