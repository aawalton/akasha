import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const purge = {
  id: "019e6f53-a565-7dc1-a28f-43efe1910a7a",
  pageTypeSlug: "temper-skill",
  slug: "purge",
  title: "Purge",
  key: "purge",
  baseName: "Purge",
  description:
    '"Cleanse yourself and your group, removing up to |cffffff3|r negative effects immediately."',
  icon: "/esoui/art/icons/ability_ava_005.dds",
  esoSkillId: 38571,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "alliance-war-support",
  skillType: "active",
  subcategoryId: "alliance-war-support",
} as const satisfies TemperSkill
