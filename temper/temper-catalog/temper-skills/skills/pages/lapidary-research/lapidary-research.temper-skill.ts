import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const lapidaryResearch = {
  id: "019e6224-cca0-7d78-9613-3d740e708b4f",
  pageTypeSlug: "temper-skill",
  slug: "lapidary-research",
  title: "Lapidary Research",
  key: "lapidary-research",
  baseName: "Lapidary Research",
  description: '"Reduces research times by 25%, and limits research time to 30 days."',
  icon: "/esoui/art/icons/passive_lapidaryresearch.dds",
  esoSkillId: 108098,
  isMorph: false,
  learnedLevel: 45,
  lineRankNeeded: 45,
  morphIndex: 0,
  rank: 4,
  skillLineId: "craft-jewelry-crafting",
  skillType: "passive",
  subcategoryId: "craft-jewelry-crafting",
} as const satisfies TemperSkill
