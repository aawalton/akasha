import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const snakeblood = {
  id: "019e6224-ccae-70d5-9930-f5a3a34b2ef5",
  pageTypeSlug: "temper-skill",
  slug: "snakeblood",
  title: "Snakeblood",
  key: "snakeblood",
  baseName: "Snakeblood",
  description: '"Reduces duration of negative effects in potions by 100% when consumed."',
  icon: "/esoui/art/icons/ability_alchemy_005.dds",
  esoSkillId: 47834,
  isMorph: false,
  learnedLevel: 43,
  lineRankNeeded: 43,
  morphIndex: 0,
  rank: 3,
  skillLineId: "craft-alchemy",
  skillType: "passive",
  subcategoryId: "craft-alchemy",
} as const satisfies TemperSkill
