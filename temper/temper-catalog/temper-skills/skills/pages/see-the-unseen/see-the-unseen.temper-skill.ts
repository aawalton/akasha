import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const seeTheUnseen = {
  id: "019e6238-c309-74f7-9b70-e38e850fb118",
  pageTypeSlug: "temper-skill",
  slug: "see-the-unseen",
  title: "See the Unseen",
  key: "see-the-unseen",
  baseName: "See the Unseen",
  description:
    '"The insight you have gained from the Psijic Order grants you vision of the spiritual world. You can now interact with rifts all throughout Tamriel."',
  icon: "/esoui/art/icons/ability_psijic_007.dds",
  esoSkillId: 103793,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "guild-psijic-order",
  skillType: "passive",
  subcategoryId: "guild-psijic-order",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
