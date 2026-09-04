import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const tough = {
  id: "019e624a-12e4-79ec-8385-beae0a3eb1f4",
  pageTypeSlug: "temper-skill",
  slug: "tough",
  title: "Tough",
  key: "tough",
  baseName: "Tough",
  description: '"Increases your Max Health by 2000."',
  icon: "/esoui/art/icons/ability_dragonknight_020.dds",
  esoSkillId: 50907,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 3,
  skillLineId: "racial-imperial-skills",
  skillType: "passive",
  subcategoryId: "racial-imperial-skills",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
