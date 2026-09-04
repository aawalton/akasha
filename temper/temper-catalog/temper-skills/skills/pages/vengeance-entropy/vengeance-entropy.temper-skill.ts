import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceEntropy = {
  id: "019e6f53-a8ff-7be5-be72-043ce194bde0",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-entropy",
  title: "Vengeance Entropy",
  key: "vengeance-entropy",
  baseName: "Vengeance Entropy",
  description:
    '"Bind an enemy with chaotic magic, dealing |cffffff16800|r Magic Damage over |cffffff6|r seconds."',
  icon: "/esoui/art/icons/ability_mageguild_004.dds",
  esoSkillId: 246479,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-guild-mages-guild",
  skillType: "active",
  subcategoryId: "vengeance-guild-mages-guild",
} as const satisfies TemperSkill
