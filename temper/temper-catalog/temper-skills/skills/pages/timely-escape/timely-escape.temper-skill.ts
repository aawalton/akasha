import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const timelyEscape = {
  id: "019e6238-c326-7b88-a983-df9b47918b91",
  pageTypeSlug: "temper-skill",
  slug: "timely-escape",
  title: "Timely Escape",
  key: "timely-escape",
  baseName: "Timely Escape",
  description:
    '"When you have Bounty and are in combat, you have a chance to spot a \\"Footpad\\" in a town with a Refuge. Interacting with the Footpad will transport the player safely into the nearest Refuge."',
  icon: "/esoui/art/icons/ability_thievesguild_passive_004.dds",
  esoSkillId: 76452,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 7,
  morphIndex: 0,
  rank: 1,
  skillLineId: "guild-thieves-guild",
  skillType: "passive",
  subcategoryId: "guild-thieves-guild",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
