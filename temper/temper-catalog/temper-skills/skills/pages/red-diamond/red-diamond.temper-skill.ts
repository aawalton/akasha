import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const redDiamond = {
  id: "019e624a-12d4-7463-a1df-3afa621c617a",
  pageTypeSlug: "temper-skill",
  slug: "red-diamond",
  title: "Red Diamond",
  key: "red-diamond",
  baseName: "Red Diamond",
  description: '"Reduces the cost of all your abilities by 6%."',
  icon: "/esoui/art/icons/ability_dragonknight_028.dds",
  esoSkillId: 45293,
  isMorph: false,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 3,
  skillLineId: "racial-imperial-skills",
  skillType: "passive",
  subcategoryId: "racial-imperial-skills",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
