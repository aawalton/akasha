import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const tanninExpertise = {
  id: "019e6224-ccb2-760b-823a-deef5566640f",
  pageTypeSlug: "temper-skill",
  slug: "tannin-expertise",
  title: "Tannin Expertise",
  key: "tannin-expertise",
  baseName: "Tannin Expertise",
  description: '"More than doubles the chances to improve items with tannins."',
  icon: "/esoui/art/icons/ability_tradecraft_004.dds",
  esoSkillId: 48198,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 3,
  skillLineId: "craft-clothing",
  skillType: "passive",
  subcategoryId: "craft-clothing",
} as const satisfies TemperSkill
