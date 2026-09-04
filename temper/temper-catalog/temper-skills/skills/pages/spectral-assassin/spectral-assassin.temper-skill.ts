import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const spectralAssassin = {
  id: "019e6238-c315-7e75-a06a-ed701d98f617",
  pageTypeSlug: "temper-skill",
  slug: "spectral-assassin",
  title: "Spectral Assassin",
  key: "spectral-assassin",
  baseName: "Spectral Assassin",
  description:
    '"15% chance to shroud you when using the Blade of Woe, shielding you from being witnessed and receiving a Bounty."',
  icon: "/esoui/art/icons/ability_darkbrotherhood_passive_006.dds",
  esoSkillId: 77401,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 1,
  skillLineId: "guild-dark-brotherhood",
  skillType: "passive",
  subcategoryId: "guild-dark-brotherhood",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
