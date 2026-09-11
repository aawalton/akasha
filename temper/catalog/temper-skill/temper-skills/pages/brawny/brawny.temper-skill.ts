import type { TemperSkill } from "akasha/temper/catalog/temper-skill/temper-skills/temper-skill.page-type.types.ts"

export const brawny = {
  id: "019e624a-12c1-726c-8677-2e48f66258b5",
  type: "temper-skill",
  slug: "brawny",
  title: "Brawny",
  key: "brawny",
  baseName: "Brawny",
  description: '"Increases your Max Stamina by 1000."',
  icon: "/esoui/art/icons/ability_dragonknight_020.dds",
  esoSkillId: 45309,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 0,
  rank: 3,
  skillLineId: "racial-orc-skills",
  skillType: "passive",
  subcategoryId: "racial-orc-skills",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
