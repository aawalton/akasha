import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const flourish = {
  id: "019e6245-a687-7a4d-bb7a-b06a04aded2d",
  pageTypeSlug: "temper-skill",
  slug: "flourish",
  title: "Flourish",
  key: "flourish",
  baseName: "Flourish",
  description: '"Increases your Magicka and Stamina recovery by 20%."',
  icon: "/esoui/art/icons/passive_warden_012.dds",
  esoSkillId: 86067,
  isMorph: false,
  learnedLevel: 36,
  lineRankNeeded: 36,
  morphIndex: 0,
  rank: 2,
  skillLineId: "warden-animal-companions",
  skillType: "passive",
  subcategoryId: "warden-animal-companions",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
