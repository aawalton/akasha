import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const penetratingMagic30957 = {
  id: "019e6f53-a4e6-73e0-80c9-07f6ca96b14c",
  type: "page-type/temper-skill",
  slug: "penetrating-magic-30957",
  title: "Penetrating Magic",
  key: "penetrating-magic-30957",
  baseName: "Penetrating Magic",
  description:
    '"Your Destruction Staff abilities ignore |cffffff1487|r of the enemy\'s Spell Resistance."',
  icon: "/esoui/art/icons/ability_weapon_008.dds",
  esoSkillId: 30957,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 10,
  skillLineId: "temper-skill-line/weapon-destruction-staff",
  skillType: "temper-skill-type/passive",
} as const satisfies TemperSkill
