import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const mending31751 = {
  id: "019e6f53-a474-7d65-986c-a6892c99b485",
  pageTypeSlug: "temper-skill",
  slug: "mending-31751",
  title: "Mending",
  key: "mending-31751",
  baseName: "Mending",
  description:
    '"Increases your healing done by up to |cffffff6|r%, in proportion to the severity of the target\'s wounds."',
  icon: "/esoui/art/icons/ability_templar_004.dds",
  esoSkillId: 31751,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 8,
  morphIndex: 0,
  rank: 8,
  skillLineId: "templar-restoring-light",
  skillType: "passive",
  subcategoryId: "templar-restoring-light",
} as const satisfies TemperSkill
