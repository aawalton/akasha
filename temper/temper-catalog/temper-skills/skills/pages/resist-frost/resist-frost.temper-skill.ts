import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const resistFrost = {
  id: "019e624a-12d8-78ad-9e7e-eb5c4ae251c2",
  pageTypeSlug: "temper-skill",
  slug: "resist-frost",
  title: "Resist Frost",
  key: "resist-frost",
  baseName: "Resist Frost",
  description: '"Increases your Max Health by 1000 and Frost Resistance by 4620."',
  icon: "/esoui/art/icons/ability_sorcerer_012.dds",
  esoSkillId: 45304,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 3,
  skillLineId: "racial-nord-skills",
  skillType: "passive",
  subcategoryId: "racial-nord-skills",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
