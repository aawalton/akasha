import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const cycleOfLife = {
  id: "019e6226-00df-7218-bc92-65cc9a98889c",
  type: "page-type/temper-skill",
  slug: "cycle-of-life",
  title: "Cycle of Life",
  key: "cycle-of-life",
  baseName: "Cycle of Life",
  description: '"Your fully-charged Heavy Attacks restore 30% more Magicka."',
  icon: "/esoui/art/icons/ability_weapon_004.dds",
  esoSkillId: 45520,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/weapon-restoration-staff",
  skillType: "temper-skill-type/passive",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
