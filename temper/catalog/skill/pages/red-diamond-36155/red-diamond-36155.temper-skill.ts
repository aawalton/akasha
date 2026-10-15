import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const redDiamond36155 = {
  id: "019e6f53-a5d3-7047-9c19-1dd2d0cb9718",
  type: "page-type/temper-skill",
  slug: "red-diamond-36155",
  title: "Red Diamond",
  key: "red-diamond-36155",
  baseName: "Red Diamond",
  description: "Reduces the cost of all your abilities by |cffffff2|r%.",
  icon: "/esoui/art/icons/ability_dragonknight_028.dds",
  esoSkillId: 36155,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 25,
  morphIndex: 0,
  rank: 25,
  skillLineId: "temper-skill-line/racial-imperial-skills",
  skillType: "temper-skill-type/passive",
  hashPlace: 1003,
  createdAt: "2026-05-28T16:03:33.459Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 2% (Constant)"],
} as const satisfies TemperSkill
