import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const deliberation = {
  id: "019e6238-c2b2-7e9a-b9ca-aceac4788682",
  pageTypeSlug: "temper-skill",
  slug: "deliberation",
  title: "Deliberation",
  key: "deliberation",
  baseName: "Deliberation",
  description:
    '"While you are casting or channeling a Psijic Order ability you reduce your damage taken by 30%."',
  icon: "/esoui/art/icons/ability_psijic_011.dds",
  esoSkillId: 103972,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 9,
  morphIndex: 0,
  rank: 1,
  skillLineId: "guild-psijic-order",
  skillType: "passive",
  subcategoryId: "guild-psijic-order",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
