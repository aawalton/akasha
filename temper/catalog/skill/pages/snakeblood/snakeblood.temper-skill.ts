import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const snakeblood = {
  id: "019e6224-ccae-70d5-9930-f5a3a34b2ef5",
  type: "page-type/temper-skill",
  slug: "snakeblood",
  title: "Snakeblood",
  key: "snakeblood",
  baseName: "Snakeblood",
  description: "Reduces duration of negative effects in potions by 100% when consumed.",
  icon: "/esoui/art/icons/ability_alchemy_005.dds",
  esoAbilityId: 47834,
  isMorph: false,
  learnedLevel: 43,
  lineRankNeeded: 43,
  morphIndex: 0,
  rank: 3,
  skillLineId: "temper-skill-line/craft-alchemy",
  skillType: "temper-skill-type/passive",
  hashPlace: 1209,
  createdAt: "2026-05-26T02:37:19.406Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
} as const satisfies TemperSkill
