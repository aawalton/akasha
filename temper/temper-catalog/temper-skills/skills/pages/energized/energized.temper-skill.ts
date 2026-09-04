import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const energized = {
  id: "019e6245-a66c-7645-98c7-ca034565b3e1",
  pageTypeSlug: "temper-skill",
  slug: "energized",
  title: "Energized",
  key: "energized",
  baseName: "Energized",
  description: '"Increases your Physical and Shock Damage by 5%."',
  icon: "/esoui/art/icons/ability_sorcerer_015.dds",
  esoSkillId: 45190,
  isMorph: false,
  learnedLevel: 27,
  lineRankNeeded: 27,
  morphIndex: 0,
  rank: 2,
  skillLineId: "sorcerer-storm-calling",
  skillType: "passive",
  subcategoryId: "sorcerer-storm-calling",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
