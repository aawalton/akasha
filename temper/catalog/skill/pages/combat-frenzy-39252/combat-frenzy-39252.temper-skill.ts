import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const combatFrenzy39252 = {
  id: "019e6f53-a001-7348-8410-42ed89e2deaa",
  type: "page-type/temper-skill",
  slug: "combat-frenzy-39252",
  title: "Combat Frenzy",
  key: "combat-frenzy-39252",
  baseName: "Combat Frenzy",
  description: '"You generate |cffffff10|r Ultimate when you kill an enemy player."',
  icon: "/esoui/art/icons/ability_weapon_023.dds",
  esoSkillId: 39252,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 8,
  morphIndex: 0,
  rank: 8,
  skillLineId: "temper-skill-line/alliance-war-assault",
  skillType: "temper-skill-type/passive",
} as const satisfies TemperSkill
