import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const penetratingMagic = {
  id: "019e6226-0101-7789-98ba-e2cfd15594ca",
  type: "page-type/temper-skill",
  slug: "penetrating-magic",
  title: "Penetrating Magic",
  key: "penetrating-magic",
  baseName: "Penetrating Magic",
  description: '"Your Destruction Staff abilities ignore 2974 of the enemy\'s Spell Resistance."',
  icon: "/esoui/art/icons/ability_weapon_008.dds",
  esoSkillId: 45509,
  isMorph: false,
  learnedLevel: 17,
  lineRankNeeded: 17,
  morphIndex: 0,
  rank: 2,
  skillLineId: "weapon-destruction-staff",
  skillType: "temper-skill-type/passive",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
