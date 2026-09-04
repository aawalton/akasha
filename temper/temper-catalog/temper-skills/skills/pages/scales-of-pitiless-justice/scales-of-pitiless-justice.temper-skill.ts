import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const scalesOfPitilessJustice = {
  id: "019e6238-c308-7715-866c-75fb7033fd0d",
  pageTypeSlug: "temper-skill",
  slug: "scales-of-pitiless-justice",
  title: "Scales of Pitiless Justice",
  key: "scales-of-pitiless-justice",
  baseName: "Scales of Pitiless Justice",
  description: '"Bounty and Heat resulting from a witnessed Murder or Assault is reduced by 50%."',
  icon: "/esoui/art/icons/ability_darkbrotherhood_passive_002.dds",
  esoSkillId: 79865,
  isMorph: false,
  learnedLevel: 11,
  lineRankNeeded: 11,
  morphIndex: 0,
  rank: 4,
  skillLineId: "guild-dark-brotherhood",
  skillType: "passive",
  subcategoryId: "guild-dark-brotherhood",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
