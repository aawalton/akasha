import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const magickaFlood = {
  id: "019e6245-a6c5-7164-8df9-5a8d8cb343bb",
  pageTypeSlug: "temper-skill",
  slug: "magicka-flood",
  title: "Magicka Flood",
  key: "magicka-flood",
  baseName: "Magicka Flood",
  description: '"Increases your Max Magicka and Stamina by 6%."',
  icon: "/esoui/art/icons/passive_sorcerer_008.dds",
  esoSkillId: 45150,
  isMorph: false,
  learnedLevel: 27,
  lineRankNeeded: 27,
  morphIndex: 0,
  rank: 2,
  skillLineId: "nightblade-siphoning",
  skillType: "passive",
  subcategoryId: "nightblade-siphoning",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
