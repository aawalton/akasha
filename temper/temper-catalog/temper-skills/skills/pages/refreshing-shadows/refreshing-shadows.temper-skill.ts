import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const refreshingShadows = {
  id: "019e6245-a705-7522-b089-d0b86fe22ca9",
  pageTypeSlug: "temper-skill",
  slug: "refreshing-shadows",
  title: "Refreshing Shadows",
  key: "refreshing-shadows",
  baseName: "Refreshing Shadows",
  description: '"Increases your Health, Stamina, and Magicka Recovery by 15%."',
  icon: "/esoui/art/icons/ability_sorcerer_038.dds",
  esoSkillId: 45103,
  isMorph: false,
  learnedLevel: 18,
  lineRankNeeded: 18,
  morphIndex: 0,
  rank: 2,
  skillLineId: "nightblade-shadow",
  skillType: "passive",
  subcategoryId: "nightblade-shadow",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
