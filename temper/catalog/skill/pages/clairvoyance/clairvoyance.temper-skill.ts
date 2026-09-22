import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const clairvoyance = {
  id: "019e6238-c2a8-7520-806c-b8816c351370",
  type: "page-type/temper-skill",
  slug: "clairvoyance",
  title: "Clairvoyance",
  key: "clairvoyance",
  baseName: "Clairvoyance",
  description: '"Reduces the cost of your Psijic Order abilities by 15%."',
  icon: "/esoui/art/icons/ability_psijic_008.dds",
  esoSkillId: 103811,
  isMorph: false,
  learnedLevel: 5,
  lineRankNeeded: 5,
  morphIndex: 0,
  rank: 2,
  skillLineId: "guild-psijic-order",
  skillType: "temper-skill-type/passive",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
