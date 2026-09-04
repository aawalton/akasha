import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const lunarBlessings = {
  id: "019e624a-12cf-7c22-adaf-3ba578576319",
  pageTypeSlug: "temper-skill",
  slug: "lunar-blessings",
  title: "Lunar Blessings",
  key: "lunar-blessings",
  baseName: "Lunar Blessings",
  description: '"Increase your Maximum Health, Magicka, and Stamina by 915."',
  icon: "/esoui/art/icons/passive_khajiit_01.dds",
  esoSkillId: 117848,
  isMorph: false,
  learnedLevel: 40,
  lineRankNeeded: 40,
  morphIndex: 0,
  rank: 3,
  skillLineId: "racial-khajiit-skills",
  skillType: "passive",
  subcategoryId: "racial-khajiit-skills",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
