import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const ranger = {
  id: "019e6226-0109-710f-92d3-572ea92744b1",
  pageTypeSlug: "temper-skill",
  slug: "ranger",
  title: "Ranger",
  key: "ranger",
  baseName: "Ranger",
  description: '"Reduces the Stamina cost of Bow abilities by 15%."',
  icon: "/esoui/art/icons/ability_armor_011.dds",
  esoSkillId: 45493,
  isMorph: false,
  learnedLevel: 28,
  lineRankNeeded: 28,
  morphIndex: 0,
  rank: 2,
  skillLineId: "weapon-bow",
  skillType: "passive",
  subcategoryId: "weapon-bow",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
