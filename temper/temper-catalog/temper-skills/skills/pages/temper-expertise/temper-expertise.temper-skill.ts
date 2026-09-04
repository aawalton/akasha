import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const temperExpertise = {
  id: "019e6224-ccb3-7991-9d2b-fe2ba34af3e6",
  pageTypeSlug: "temper-skill",
  slug: "temper-expertise",
  title: "Temper Expertise",
  key: "temper-expertise",
  baseName: "Temper Expertise",
  description: '"More than doubles the chances to improve items with tempers."',
  icon: "/esoui/art/icons/ability_smith_004.dds",
  esoSkillId: 48168,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 3,
  skillLineId: "craft-blacksmithing",
  skillType: "passive",
  subcategoryId: "craft-blacksmithing",
} as const satisfies TemperSkill
