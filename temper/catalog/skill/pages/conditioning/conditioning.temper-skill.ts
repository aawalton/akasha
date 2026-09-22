import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const conditioning = {
  id: "019e624a-12c2-747f-afa8-a8edb36eb1b9",
  type: "page-type/temper-skill",
  slug: "conditioning",
  title: "Conditioning",
  key: "conditioning",
  baseName: "Conditioning",
  description: '"Increases your Max Stamina by 2000."',
  icon: "/esoui/art/icons/ability_dragonknight_021.dds",
  esoSkillId: 117754,
  isMorph: false,
  learnedLevel: 40,
  lineRankNeeded: 40,
  morphIndex: 0,
  rank: 3,
  skillLineId: "temper-skill-line/racial-redguard-skills",
  skillType: "temper-skill-type/passive",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
