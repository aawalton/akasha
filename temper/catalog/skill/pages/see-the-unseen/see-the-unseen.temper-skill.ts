import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const seeTheUnseen = {
  id: "019e6238-c309-74f7-9b70-e38e850fb118",
  type: "page-type/temper-skill",
  slug: "see-the-unseen",
  title: "See the Unseen",
  key: "see-the-unseen",
  baseName: "See the Unseen",
  description:
    "The insight you have gained from the Psijic Order grants you vision of the spiritual world. You can now interact with rifts all throughout Tamriel.",
  icon: "/esoui/art/icons/ability_psijic_007.dds",
  esoAbilityId: 103793,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/guild-psijic-order",
  skillType: "temper-skill-type/passive",
  status: "unsupported",
  effects: "jsonl",
  hashPlace: 1147,
  createdAt: "2026-05-26T02:59:07.657Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
} as const satisfies TemperSkill
