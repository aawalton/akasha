import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const combatFrenzy = {
  id: "019e6251-4c9e-74cd-aec2-8170889b4fdb",
  type: "page-type/temper-skill",
  slug: "combat-frenzy",
  title: "Combat Frenzy",
  key: "combat-frenzy",
  baseName: "Combat Frenzy",
  description: '"You generate 20 Ultimate when you kill an enemy player."',
  icon: "/esoui/art/icons/ability_weapon_023.dds",
  esoSkillId: 45619,
  isMorph: false,
  learnedLevel: 10,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 2,
  skillLineId: "alliance-war-assault",
  skillType: "temper-skill-type/passive",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
