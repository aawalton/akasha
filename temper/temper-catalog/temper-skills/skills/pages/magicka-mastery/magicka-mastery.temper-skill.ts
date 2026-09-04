import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const magickaMastery = {
  id: "019e624a-12d0-7d58-b607-cf19ac5be88c",
  pageTypeSlug: "temper-skill",
  slug: "magicka-mastery",
  title: "Magicka Mastery",
  key: "magicka-mastery",
  baseName: "Magicka Mastery",
  description: '"Reduces the Magicka cost of your abilities by 7%."',
  icon: "/esoui/art/icons/ability_armor_005.dds",
  esoSkillId: 45264,
  isMorph: false,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 3,
  skillLineId: "racial-breton-skills",
  skillType: "passive",
  subcategoryId: "racial-breton-skills",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
