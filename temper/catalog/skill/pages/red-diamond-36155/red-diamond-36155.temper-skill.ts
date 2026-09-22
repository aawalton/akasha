import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const redDiamond36155 = {
  id: "019e6f53-a5d3-7047-9c19-1dd2d0cb9718",
  type: "page-type/temper-skill",
  slug: "red-diamond-36155",
  title: "Red Diamond",
  key: "red-diamond-36155",
  baseName: "Red Diamond",
  description: '"Reduces the cost of all your abilities by |cffffff2|r%."',
  icon: "/esoui/art/icons/ability_dragonknight_028.dds",
  esoSkillId: 36155,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 25,
  morphIndex: 0,
  rank: 25,
  skillLineId: "racial-imperial-skills",
  skillType: "temper-skill-type/passive",
} as const satisfies TemperSkill
