import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const tailoring = {
  id: "019e6224-ccb1-722e-84c0-e9217c6ce9d1",
  pageTypeSlug: "temper-skill",
  slug: "tailoring",
  title: "Tailoring",
  key: "tailoring",
  baseName: "Tailoring",
  description: '"Allows the use of Ancestor Silk and Rubedo Leather."',
  icon: "/esoui/art/icons/ability_tradecraft_002.dds",
  esoSkillId: 70044,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 10,
  skillLineId: "craft-clothing",
  skillType: "passive",
  subcategoryId: "craft-clothing",
} as const satisfies TemperSkill
