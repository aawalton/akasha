import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const cycleOfLife = {
  id: "019e6226-00df-7218-bc92-65cc9a98889c",
  pageTypeSlug: "temper-skill",
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
  skillLineId: "weapon-restoration-staff",
  skillType: "passive",
  subcategoryId: "weapon-restoration-staff",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
