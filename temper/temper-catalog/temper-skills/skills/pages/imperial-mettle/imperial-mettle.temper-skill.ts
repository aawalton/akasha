import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const imperialMettle = {
  id: "019e624a-12cd-79af-8e9a-a879c4c9ea14",
  pageTypeSlug: "temper-skill",
  slug: "imperial-mettle",
  title: "Imperial Mettle",
  key: "imperial-mettle",
  baseName: "Imperial Mettle",
  description: '"Increases your Max Stamina by 2000."',
  icon: "/esoui/art/icons/ability_dragonknight_021.dds",
  esoSkillId: 45280,
  isMorph: false,
  learnedLevel: 40,
  lineRankNeeded: 40,
  morphIndex: 0,
  rank: 3,
  skillLineId: "racial-imperial-skills",
  skillType: "passive",
  subcategoryId: "racial-imperial-skills",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
